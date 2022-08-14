import { getSession } from "next-auth/react";
import {
  checkPassword,
  hashPassword,
  verifyPassword,
} from "../../../helpers/auth";
import { connectToDataBase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    res.status(404).json({ message: "wrong method" });
    return;
  }
  const session = await getSession({ req: req });
  if (!session) {
    res.status(401).json({ message: "not authenticatid!" });
    return;
  }
  let client;
  try {
    client = await connectToDataBase();
  } catch (error) {
    res.status(500).json({ message: "cannot connect to databse" });
    return;
  }
  const { email, oldPassword, newpassword, repeatNewPassword } = req.body;
  if (
    !checkPassword(oldPassword) ||
    !checkPassword(newpassword) ||
    !checkPassword(repeatNewPassword) ||
    newpassword !== repeatNewPassword
  ) {
    client.close();
    res.status(422).json({ message: "Invalid input" });
    return;
  }
  const userEmail = session.user.email;
  const userCollection = await client.db().collection("next-users");
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: "user not found" });
    return;
  }

  const currentPassword = user.password;
  const isvalid = await verifyPassword(oldPassword, currentPassword);

  if (!isvalid) {
    client.close();
    res.status(403).json({ message: "Invalid password" });
    return;
  }

  const hashedPassword = await hashPassword(newpassword);
  let result;
  try {
    result = await userCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
  } catch (error) {
    client.close();
    res.status(401).json({ message: "cannot change password" });
    return;
  }

  client.close();
  res.status(200).json({ message: "password successfully changed!" });
}

export default handler;
