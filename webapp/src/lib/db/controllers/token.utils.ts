import jwt from "jsonwebtoken";
import { getUserFromEmail } from "./user-utils";

export type TokenData = {
  id: string;
  email: string;
  name: string;
};

export function getDataFromToken(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
  return jwt.verify(token, JWT_SECRET) as TokenData;
}

export async function getUserFromToken(token: string) {
  const data = getDataFromToken(token);
  const user = await getUserFromEmail(data.email);
  return user;
}

export async function isTokenValid(token: string) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
