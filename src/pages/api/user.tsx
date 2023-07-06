import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "./../../../lib/serverAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { currentUser } = await serverAuth(req);
  console.log(currentUser);

  if (req.method === "GET") {
    try {
      // console.log(currentUser);
      return res.status(200).json(currentUser);
    } catch (error) {
      // console.log(error);
      return res.status(401).end();
    }
  }
}
