import React from "react";

export const Users = ({ users, isLoading }) => {
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
