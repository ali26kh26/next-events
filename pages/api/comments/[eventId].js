import {
  connectDataBase,
  getFilteredDocuments,
  insertDocument,
} from "../../../helpers/api-util";
import { ObjectId } from "mongodb";
import { findParentComment } from "../../../helpers/comments-util";

async function handler(req, res) {
  const eventId = req.query.eventId;
  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: "connecting database failed" });
    return;
  }

  //for create a comment in root level

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid iput" });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      client.close();
    } catch (error) {
      res.status(500).json({ message: "inserting data failed" });
      return;
    }

    res.status(201).json({ message: "comment addded", comment: newComment });
  }

  // for get comments for specific event
  else if (req.method === "GET") {
    let eventComments;
    try {
      eventComments = await getFilteredDocuments(
        client,
        "comments",
        { eventId: eventId },
        { _id: -1 }
      );
    } catch (error) {
      client.close();
      res.status(500).json({ message: "fetching data failed" });
      return;
    }
    client.close();
    res.status(201).json({ comments: eventComments });
  }

  // for reply to an comment
  else if (req.method === "PUT") {
    const { commentId, newComment, parentId } = req.body;

    let parentComment;
    if (parentId) {
      parentComment = await findParentComment(client, parentId);
    }
    let selectedComment;
    const commentsCollection = client.db().collection("comments");

    try {
      selectedComment = await commentsCollection.findOne({
        _id: ObjectId(commentId),
      });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "fetching data failed" });
      return;
    }
    if (!selectedComment) {
      res.status(404).json({ message: "comment not found" });
      client.close();
      return;
    }

    let result;
    try {
      result = await commentsCollection.updateOne(
        { _id: ObjectId(commentId) },
        {
          $push: {
            replies: {
              ...newComment,
              _id: new ObjectId(),
              eventId: eventId,
              replyTo: new ObjectId(commentId),
            },
          },
        }
      );
    } catch (error) {
      client.close();
      res.status(401).json({ message: "cannot reply to comment" });
      return;
    }
    res.status(201).json({ message: "your comment applied" });
  }
}

export default handler;
