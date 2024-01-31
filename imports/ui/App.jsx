import React from "react";
import { Users } from "./Users.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users";
import { MessagesCollection } from "../api/message.js";
import { Message } from "./Message.jsx";

export const App = () => {
  const [message, setMessage] = React.useState("");

  const { users, messages, isLoading } = useTracker(() => {
    const noDataAvailable = { users: [], messages: [] };

    const userHandler = Meteor.subscribe("users");
    const messageHandler = Meteor.subscribe("messages");

    if (!userHandler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    if (!messageHandler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const users = UsersCollection.find().fetch();
    const messages = MessagesCollection.find().fetch();

    return { users, messages };
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const sendButton = () => {
    const messagePayload = {
      text: message,
      userId: "noDbdboErHm8KeGHj",
    };

    MessagesCollection.insert(messagePayload);
    setMessage("");
  };

  return (
    <div className={"bg-black w-screen h-screen flex justify-center p-32"}>
      <div className={""}>
        <Users users={users} isLoading={isLoading} />

        <div className={"space-y-4"}>
          {messages.map((message) => (
            <Message message={message} />
          ))}
        </div>

        <div className={"flex items-center gap-x-2 mt-16"}>
          <input
            className={
              "bg-zinc-800 rounded-lg border border-zinc-700 text-zinc-400 outline-none py-2 px-4 "
            }
            placeholder={"Type a message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className={
              "bg-indigo-500 transition-all ease-linear hover:bg-indigo-700 text-white rounded-lg border-zinc-200 py-2 px-8"
            }
            onClick={sendButton}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
