/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import Welcome from "../../../emails/welcome";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name } = req.body;
  console.log(email, name);
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Welcome",
      //@ts-ignore
      react: Welcome({ email, name }),
    });

    res.status(200).json(` sent to ${email} , ${name} , ${data}`);
  } catch (error) {
    res.status(400).json(error);
  }
};
