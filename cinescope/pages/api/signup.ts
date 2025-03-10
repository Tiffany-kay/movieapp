import { NextApiRequest, NextApiResponse } from "next";
import { saveUserData } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const { token, username: savedUsername } = await saveUserData(username, email, password);
    res.status(200).json({ token, username: savedUsername });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
