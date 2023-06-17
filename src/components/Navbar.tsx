/* eslint-disable @next/next/no-img-element */
import { useAtom } from "jotai";
import React, { useState } from "react";
import Cart from "./cart";
import { cartOpenAtom, navOpenAtom } from "../atoms";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  console.log(session);
  const [open, setOpen] = useAtom(navOpenAtom);
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);
  return (
    <div className="shadow bg-[#eee5e5]">
      <div className="flex h-12 justify-between items-center   ">
        <div
          className="flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img className="w-12" src="/logo.png" alt="logo" />
          <h1 className="w-fit text-2xl font-Pacifico font-bold">Le Khalil Le Cookies</h1>
        </div>

        <ul
          className={
            !open
              ? "md:flex justify-center items-center gap-3 text-xl hidden"
              : "absolute  flex flex-col justify-center items-center mt-[8.2rem] w-full  bg-[#eee5e5]  md:flex-row md:bg-transparent md:static md:mt-0 md:w-fit  md:text-base md:justify-between md:items-center md:gap-4"
          }
        >
          {session ? (
            <li
              onClick={() => {
                signOut();
              }}
              className="text-xl bg-[#F45867] rounded-3xl shadow px-2"
            >
              Logout
            </li>
          ) : (
            <Link href="/auth">Sign In</Link>
          )}
          {session && <li className="text-xl bg-[#F45867] rounded-3xl shadow px-2">{`Hello ${session.user?.name?.toUpperCase()}`}</li>}
          <li className="cursor-pointer text-xl">Who Are We</li>
          <li className="cursor-pointer  ">
            <img
              onClick={() => {
                setCartOpen(!cartOpen);
                setOpen(false);
              }}
              className="w-8 cursor-pointer m-3 "
              src="/bag.svg"
              alt="bag"
            />
          </li>
        </ul>
        <img
          onClick={() => {
            setOpen(!open);
          }}
          className="w-8 cursor-pointer md:hidden"
          src="/menu2.png"
          alt=""
        />
      </div>
      {cartOpen && (
        <div className="flex justify-center items-center ">
          <Cart />
        </div>
      )}
    </div>
  );
};

export default Navbar;
