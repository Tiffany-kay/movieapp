import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email, password } = req.body;

  // Dummy user authentication (Replace with DB logic)
  if (email === "test@example.com" && password === "password123") {
    return res.status(200).json({ success: true, token: "fake-jwt-token" });
  }

  return res.status(401).json({ success: false, errors: "Invalid credentials" });
}
