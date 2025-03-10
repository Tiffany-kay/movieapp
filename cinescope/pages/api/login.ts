import { NextApiRequest, NextApiResponse } from "next";
import { findUserByEmailAndPassword } from "@/utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await findUserByEmailAndPassword(email, password);

    if (user) {
      res.status(200).json({ token: user.token, username: user.username });
    } else {
      res.status(401).json({ errors: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
