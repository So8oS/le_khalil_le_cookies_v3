/* eslint-disable @next/next/no-img-element */
import React from "react";

const Navbar = () => {
  return (
    <div className="">
      <div className="flex h-12 justify-between items-center bg-[#eee5e5] p-2  ">
        <div className="flex justify-center items-center gap-2">
          <img className="w-12" src="/logo.png" alt="" />
          <h1 className="text-lg w-fit md:text-2xl font-Pacifico font-bold">Le Khalil Le Cookies</h1>
        </div>

        <ul className="flex justify-center items-center gap-2 text-xl">
          <li className="cursor-pointer hidden md:block">Who Are We</li>
          <img className="w-6 cursor-pointer" src="./bag.svg" alt="cart" />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
