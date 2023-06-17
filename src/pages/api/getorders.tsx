import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Order api hit");

  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const orders = await prismadb.order.findMany({
      include: {
        items: true,
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({ error: ` ${error}` });
  }
}
