import { TokenData } from "@/contexts/AuthContext";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export function signToken(data: TokenData, options?: jwt.SignOptions) {
  if (JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
  return jwt.sign(data, JWT_SECRET, options);
}

export function verifyToken(token: string): TokenData {
  if (JWT_SECRET === undefined) throw new Error("JWT_SECRET is undefined");
  return jwt.verify(token, JWT_SECRET) as TokenData;
}

export function checkAuth(
  request: NextRequest,
  callback: (authData: TokenData) => boolean
) {
  const token = request.cookies.get("token")?.value;
  if (token === undefined) return false;
  const authData = verifyToken(token);
  return callback(authData);
}
