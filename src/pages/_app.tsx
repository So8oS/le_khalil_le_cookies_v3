/* eslint-disable @next/next/no-img-element */
import "./../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <div className="flex h-12 justify-between items-center bg-[#eee5e5] p-2 ">
        <div className="flex justify-center items-center gap-1">
          <img className="w-10" src="/logo.png" alt="" />
          <h1 className="text-2xl font-Pacifico font-bold">Le Khalil Le Cookies</h1>
        </div>

        <ul className="flex justify-center items-center gap-1 text-lg">
          <li>Who Are We</li>
          <li></li>
          <img className="w-6" src="./bag.svg" alt="" />
        </ul>
      </div>
      <Component {...pageProps} />
    </div>
  );
}
