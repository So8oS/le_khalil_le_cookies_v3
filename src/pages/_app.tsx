/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import "./../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default App;
