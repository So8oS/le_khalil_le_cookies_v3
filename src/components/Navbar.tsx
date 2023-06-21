/* eslint-disable @next/next/no-img-element */
import { useAtom } from "jotai";
import React, { useState } from "react";
import Cart from "./cart";
import { cartOpenAtom, navOpenAtom } from "../atoms";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useAtom(navOpenAtom);
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);
  return (
    <div className="bg-[#eee5e5]  px-2 shadow">
      <div className="flex h-12 items-center justify-between md:p-1   ">
        <div
          className="flex cursor-pointer items-center justify-center gap-2"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <img className="w-12" src="/logo.png" alt="logo" />
          <h1 className="w-fit font-Pacifico text-2xl font-bold">
            Le Khalil Le Cookies
          </h1>
        </div>

        <ul
          className={
            !open
              ? " hidden items-center justify-center gap-3 text-xl md:flex"
              : "absolute  mt-[14.2rem] flex w-full flex-col items-center justify-center gap-5  bg-[#eee5e5]  md:static md:mt-0 md:w-fit md:flex-row md:items-center  md:justify-between md:gap-4 md:bg-transparent md:text-base"
          }
        >
          <Link
            href={"/whoarewe"}
            className="cursor-pointer text-xl"
            onClick={() => setOpen(false)}
          >
            Who Are We
          </Link>
          <li className="cursor-pointer " onClick={() => setOpen(false)}>
            <img
              onClick={() => {
                setCartOpen(!cartOpen);
                setOpen(false);
              }}
              className="w-8 cursor-pointer "
              src="/bag.svg"
              alt="bag"
            />
          </li>
          {session && (
            <Link
              href={"/account"}
              className="rounded-3xl bg-[#F45867] px-4 text-xl shadow"
              onClick={() => setOpen(false)}
            >{`${session.user?.name?.toUpperCase()}`}</Link>
          )}
          {session ? (
            <li
              onClick={() => {
                signOut();
              }}
              className="mb-2 cursor-pointer rounded-3xl bg-[#F45867] px-4 text-xl shadow md:mb-0"
            >
              Logout
            </li>
          ) : (
            <Link href="/auth">Sign In</Link>
          )}
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
        <div className="flex items-center justify-center ">
          <Cart />
        </div>
      )}
    </div>
  );
};

export default Navbar;
