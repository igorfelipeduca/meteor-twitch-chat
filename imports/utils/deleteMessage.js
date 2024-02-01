import { MessagesCollection } from "../api/message";

export async function deleteMessage(messageId) {
  console.log({ messageId });

  const deletedMessage = await MessagesCollection.removeAsync({
    _id: messageId,
  });

  return deletedMessage;
}
