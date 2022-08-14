import { MongoClient } from "mongodb";

export async function connectToDataBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://ali26kh26:AZBY1928@cluster0.mmhxu.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}
