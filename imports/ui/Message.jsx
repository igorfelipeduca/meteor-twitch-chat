import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users.js";
import { deleteMessage } from "../utils/deleteMessage.js";
import { generateRandomHexCode } from "../utils/generateHexCode.js";
// import { toast } from "sonner";

export const Message = ({ message }) => {
  const { user, isLoading } = useTracker(() => {
    const noDataAvailable = { user: {} };

    const handler = Meteor.subscribe("users");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const user = UsersCollection.findOne({ _id: message.userId });

    return { user };
  });

  if (isLoading) {
    return <p>...</p>;
  }

  const handleDeleteMessage = () => {
    deleteMessage(message._id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className={"flex gap-x-8 text-zinc-300 rounded-lg"}>
        <h3 className="font-semibold" style={{ color: user?.hex ?? "#fc0324" }}>
          {user?.nickname}
        </h3>

        <p>{message.text}</p>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="text-red-500 hover:text-red-700 cursor-pointer"
        onClick={handleDeleteMessage}
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8q-.425 0-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8q-.425 0-.712.288T13 9v7q0 .425.288.713T14 17"
        />
      </svg>
    </div>
  );
};
