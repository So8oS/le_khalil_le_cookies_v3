/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import Recieved from "../../../emails/recieved";
import { Resend } from "resend";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("yo");
  // @ts-ignore

  const session = await getServerSession(req, res, authOptions);
  const email = session?.user?.email;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      //@ts-ignore
      to: email,
      subject: "order recieved",
      // @ts-ignore

      react: Recieved({ email }),
    });

    res.status(200).json(` sent to ${email} , ${data}`);
  } catch (error) {
    res.status(400).json(error);
  }
};
