import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
export async function connectDataBase() {
  // const client = await MongoClient.connect(
  //   `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mmhxu.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  // );
  const client = await MongoClient.connect(
    `mongodb://ali26kh26:AZBY1928@cluster0-shard-00-00.mmhxu.mongodb.net:27017,cluster0-shard-00-01.mmhxu.mongodb.net:27017,cluster0-shard-00-02.mmhxu.mongodb.net:27017/events?ssl=true&replicaSet=atlas-qwvfql-shard-0&authSource=admin&retryWrites=true&w=majority`
  );
  return client;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
export async function getAllDocuments(
  client,
  collection,
  sort = {},
  projection = {}
) {
  console.log(projection);
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .project(projection)
    .sort(sort)
    .toArray();
  return documents;
}
export async function getFilteredDocuments(
  client,
  collection,
  find,
  sort = {},
  projection = {}
) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(find)
    .project(projection)
    .sort(sort)
    .toArray();
  return documents;
}
export async function getSingleDocument(client, collection, key) {
  const db = client.db();
  const document = await db.collection(collection).find(key);
  return document;
}

export async function getAllEvents() {
  const client = await connectDataBase();

  const allEvents = await getAllDocuments(client, "events", {}, { _id: 0 });
  client.close();

  return allEvents;
}

export async function getFeaturedEvents() {
  const client = await connectDataBase();
  const featuredEvents = await getFilteredDocuments(
    client,
    "events",
    {
      isFeatured: true,
    },
    {},
    { _id: 0 }
  );
  return featuredEvents;
}

export async function getEventById(id) {
  const client = await connectDataBase();
  const selectedEvent = await getFilteredDocuments(
    client,
    "events",
    {
      id: id,
    },
    {},
    { _id: 0 }
  );
  return selectedEvent[0];
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
