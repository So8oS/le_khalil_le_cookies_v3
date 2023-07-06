/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import Status from "../../../emails/status";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("yo");

  const { email, status } = req.body;
  console.log(email, status);

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Order Status",
      //@ts-ignore
      react: Status({ email, status }),
    });

    res.status(200).json(` sent to ${email}`);
  } catch (error) {
    res.status(400).json(error);
  }
};
