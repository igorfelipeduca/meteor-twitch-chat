import { UsersCollection } from "../api/users";
import { generateRandomHexCode } from "./generateHexCode";

export async function insertUser({ name, nickname, email }) {
  const hex = generateRandomHexCode();

  const createdUser = await UsersCollection.insertAsync({
    name,
    nickname,
    email,
    hex,
    createdAt: new Date(),
  });

  return createdUser;
}
