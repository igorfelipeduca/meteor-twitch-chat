import { MessagesCollection } from "../api/message";

export async function insertMessage({ userId, text }) {
  await MessagesCollection.insertAsync({
    userId,
    text,
    createdAt: new Date(),
  });
}
