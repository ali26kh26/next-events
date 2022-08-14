import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
export async function connectDataBase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mmhxu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
export async function getAllDocuments(client, collection, sort = {}) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}

export async function getSingleDocument(client, collection, key) {
  const db = client.db();
  const document = await db.collection(collection).find(key);
  return document;
}

export async function getAllEvents() {
  const client = await connectDataBase();

  const documents = await getAllDocuments(client, "events");
  const jsonDocuments = documents.map((doc) => ({
    id: doc.id,
    title: doc.title,
    description: doc.description,
    location: doc.location,
    date: doc.date,
    image: doc.image,
    isFeatured: doc.isFeatured,
  }));
  client.close();

  return jsonDocuments;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export const hashPassword = async (password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
};
