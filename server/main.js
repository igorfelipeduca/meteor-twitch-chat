import { Meteor } from "meteor/meteor";
import { UsersCollection } from "/imports/api/users";
import { MessagesCollection } from "/imports/api/message";
import { insertUser } from "../imports/utils/insertUser";
import { insertMessage } from "../imports/utils/insertMessage";

const mockUsers = [
  {
    name: "igor",
    email: "yelldutz@gmail.com",
    nickname: "ducaswtf",
  },
  {
    name: "victor",
    email: "qualquercoisa@gmail.com",
    nickname: "sabaab_",
  },
];

Meteor.startup(async () => {
  if ((await UsersCollection.find().countAsync()) === 0) {
    for (const user of mockUsers) {
      const createdUser = await insertUser(user);

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
