import { getSession } from "next-auth/react";
import { connectToDataBase } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method !== "POST") {
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

  const { url } = req.body;
  const userEmail = session.user.email;
  const userCollection = await client.db().collection("next-users");
  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    client.close();
    res.status(404).json({ message: "user not found" });
    return;
  }

  let result;
  try {
    result = await userCollection.updateOne(
      { email: userEmail },
      { $set: { profile_url: url } }
    );
  } catch (error) {
    client.close();
    res.status(401).json({ message: "cannot change password" });
    return;
  }

  client.close();
  res.status(200).json({ message: "Photo uploaded successfully!" });
}

export default handler;
