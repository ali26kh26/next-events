import { ObjectId } from "mongodb";
import { connectDataBase } from "./api-util";

export async function findUdserById(id) {
  const client = await connectDataBase();
  const user = await client
    .db()
    .collection("next-users")
    .findOne({ _id: ObjectId(id) });
  if (user) {
    return user;
  } else {
    return undefined;
  }
}
