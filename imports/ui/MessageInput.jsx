import React from "react";

export const MessageInput = ({ message, setMessage, handleMessageSend }) => {
  return (
    <div className={"flex items-center gap-x-2 pt-16"}>
      <input
        className={
          "bg-zinc-800 rounded-md border border-zinc-700 text-zinc-400 outline-none py-2 px-4 "
        }
        placeholder={"Type a message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className={
          "bg-indigo-500 transition-all ease-linear hover:bg-indigo-700 text-white rounded-md border-zinc-200 py-2 px-8"
        }
        onClick={handleMessageSend}
      >
        Send
      </button>
    </div>
  );
};
