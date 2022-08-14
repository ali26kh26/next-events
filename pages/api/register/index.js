import { connectDataBase, insertDocument } from "../../../helpers/api-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(442).json({ message: "Invalid email address" });
      return;
    }
    let client;
    try {
      client = await connectDataBase();
    } catch (error) {
      res.status(500).json({ message: "connecting to the database failed" });
      return;
    }
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
      return;
    }
    res.status(201).json({ message: "signed up" });
  }
}

export default handler;
