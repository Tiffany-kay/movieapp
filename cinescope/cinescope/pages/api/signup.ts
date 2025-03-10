import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email, password } = req.body;

  // Dummy user signup logic (Replace with DB logic)
  if (!email || !password) {
    return res.status(400).json({ success: false, errors: "All fields are required" });
  }

  return res.status(201).json({ success: true, message: "User created successfully!", token: "fake-jwt-token" });
}
