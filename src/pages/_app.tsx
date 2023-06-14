/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import "./../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
