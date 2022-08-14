import {
  connectDataBase,
  hashPassword,
  insertDocument,
} from "../../../helpers/api-util";
async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { email, password, name, lastName } = req.body;

  if (
    !name ||
    !lastName ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim() === "" ||
    password.length < 8
  ) {
    res.status(422).json({ message: "Invalid input" });
    return;
  }

  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: "Cannot connect to database!" });
    client.close();
    return;
  }

  const existingUser = await client
    .db()
    .collection("next-users")
    .findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "user exist already" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  let newUser = {
    name,
    lastName,
    email,
    password: hashedPassword,
  };

  let result;
  try {
    result = await insertDocument(client, "next-users", newUser);
  } catch (error) {
    client.close();
    res.status(500).json({ message: "Error while signig up" });
    return;
  }

  res.status(201).json({ message: "Signed Up", user: newUser });
}

export default handler;
