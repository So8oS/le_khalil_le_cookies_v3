import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    // @ts-ignore
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: "Please sign in to order :)" });
    }

    const { items, total } = req.body;

    const userId = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      select: {
        id: true,
      },
    });

    const order = await prismadb.order.create({
      data: {
        userId: userId?.id,
        items: {
          createMany: {
            data: items,
          },
        },
        total,
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({ error: ` ${error}` });
  }
}
