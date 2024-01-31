import { Meteor } from "meteor/meteor";
import { UsersCollection } from "/imports/api/users";
import { MessagesCollection } from "/imports/api/message";

async function insertUser({ name, nickname, email }) {
  await UsersCollection.insertAsync({
    name,
    nickname,
    email,
    createdAt: new Date(),
  });
}

async function insertMessage({ userId, text }) {
  await MessagesCollection.insertAsync({
    userId,
    text,
    createdAt: new Date(),
  });
}

Meteor.startup(async () => {
  if ((await UsersCollection.find().countAsync()) === 0) {
    const createdUser = await insertUser({
      name: "igor",
      email: "admin@gmail.com",
      nickname: "admin",
    });

    if ((await MessagesCollection.find().countAsync()) === 0) {
      await insertMessage({
        userId: createdUser._id,
        text: "Hello world!",
      });
    }
  }

  Meteor.publish("users", function () {
    return UsersCollection.find();
  });

  Meteor.publish("messages", function () {
    return MessagesCollection.find();
  });
});
