/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import "./../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SessionProvider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
        <div className="mt-auto" /> {/* push footer to bottom */}
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={1500}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SessionProvider>
    </div>
  );
}

export default App;
