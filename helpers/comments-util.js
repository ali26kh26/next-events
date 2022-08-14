import { ObjectId } from "mongodb";

export async function findParentComment(client, parentId) {
  const commentsCollection = client.db().collection("comments");
  selectedComment = await commentsCollection.findOne({
    _id: ObjectId(parentId),
  });
  return selectedComment;
}

export async function findNesetdComment(parentComment, nsetedCommentId) {
  const nestedCommentObjectId = new ObjectId(nsetedCommentId);
  let selectedComment;
  let route = {};
  for (const key in parentComment.replies) {
    if (parentComment.replies[key]._id === nestedCommentObjectId) {
      selectedComment = parentComment.replies[key];
    }
  }
}
