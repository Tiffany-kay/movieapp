import { NextApiRequest, NextApiResponse } from "next";
import { getUserData } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const userData = await getUserData(token); // Fetch user data based on the token
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userData);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
}