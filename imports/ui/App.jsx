import React from "react";
import { Users } from "./Users.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { UsersCollection } from "../api/users";
import { MessagesCollection } from "../api/message.js";
import { Message } from "./Message.jsx";
import { MessageInput } from "./MessageInput.jsx";
// import { Toaster } from "sonner";

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

  const handleMessageSend = () => {
    const messagePayload = {
      text: message,
      userId: users[0]._id,
    };

    MessagesCollection.insert(messagePayload);
    setMessage("");
  };

  return (
    <>
      <div className={"bg-black w-screen h-screen flex p-32"}>
        <img
          src="https://images.unsplash.com/photo-1682687981922-7b55dbb30892?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="h-full w-full"
        />

        <div className={"ml-16 h-[37rem]"}>
          <div className={"flex flex-col align-bottom justify-end h-full"}>
            {isLoading ? (
              <h3>Loading chat...</h3>
            ) : (
              <div>
                {messages.length ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <Message message={message} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center h-full justify-center">
                    <p className="text-zinc-500">No messages yet</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <MessageInput
            message={message}
            setMessage={setMessage}
            handleMessageSend={handleMessageSend}
          />
        </div>
      </div>
    </>
  );
};
