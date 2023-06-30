import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "../../../lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { orderId } = req.body;
  console.log(orderId);

  if (!orderId) {
    return res.status(400).json({ message: "Missing orderId in request body" });
  }

  try {
    const order = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "canceled",
      },
    });

    res.status(200).json({ message: "Order cancel successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error canceling order" });
  }
}
