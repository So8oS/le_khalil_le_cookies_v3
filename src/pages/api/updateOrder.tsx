import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { status, date, updatedId } = req.body;
    console.log(updatedId, status, date);

    const updatedDate = status === "Canceled" ? "--" : date;

    const updatedOrder = await prismadb.order.update({
      where: { id: updatedId },
      data: { status, date: updatedDate },
    });

    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
