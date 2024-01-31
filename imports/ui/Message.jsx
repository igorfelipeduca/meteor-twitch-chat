import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users.js";

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

  return (
    <div className={"flex gap-x-8 text-zinc-300 rounded-lg"}>
      <h3 className="text-blue-500">{user?.nickname}</h3>

      <p>{message.text}</p>
    </div>
  );
};
