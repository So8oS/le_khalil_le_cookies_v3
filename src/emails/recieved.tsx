import { Body, Button, Container, Column, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text } from "@react-email/components";

import * as React from "react";

export default function Email({ email }) {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-auto bg-[#EBCC9B] p-10">
          <Img className="mx-auto w-32 text-center  " src="https://res.cloudinary.com/dtwjgukcz/image/upload/v1688185266/yzzr2tfm6ohlqejh4ht7.png"></Img>
          <Container className="rounded-lg  text-center shadow-lg">
            <Heading className="mx-0 p-0 text-center text-[24px] font-normal text-black">Le Khalil Le Cookies</Heading>
            <Text className=" text-center">{`Your order has been recieved!`}</Text>
            <Text className=" text-center">{`We will inform you on the order status soon`}</Text>
            <Text>{`this was sent to ${email}`}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
