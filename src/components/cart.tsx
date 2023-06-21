/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAtom } from "jotai";
import { cartAtom, cartOpenAtom } from "../atoms";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Cart = () => {
  const [items, setItems] = useAtom(cartAtom);
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);

  return (
    <div className="fixed top-60 overflow-hidden rounded-xl border border-black bg-[#EEE5E5] p-4 shadow md:absolute md:right-1 md:top-[3.25rem]  ">
      <div className="flex flex-col justify-center ">
        {
          // if any quantity is not 0, then cart is not empty
          items.every((item) => item.quantity === 0) ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-center text-xl">Cart is empty</h1>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-4 cursor-pointer  rounded-3xl bg-[#F45867] px-4 py-2 text-white"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Cart</h1>
                <button
                  className="md:hidden"
                  onClick={() => {
                    setCartOpen(!cartOpen);
                  }}
                >
                  <TiDelete className="h-6 w-6 text-red-500 " />
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-2 ">
                {items.map((item, idx) => {
                  if (item.quantity === 0) return null;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-3 rounded-lg bg-[#EBCC9B] p-2 shadow-lg "
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.pic}
                          alt={item.name}
                          className="w-20 rounded-lg shadow"
                        />
                        <h1 className="w-28">{item.name}</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="">{`${item.price}`}</h1>
                        <h1>TL</h1>
                      </div>
                      <h1>{item.quantity}X</h1>
                      <button
                        onClick={() => {
                          // make quantity 0
                          setItems((prev) => {
                            const updatedItems = [...prev];
                            updatedItems[idx].quantity = 0;
                            return updatedItems;
                          });
                        }}
                      >
                        <TiDelete className="text-red-500 " />
                      </button>
                    </div>
                  );
                })}
              </div>
              <Link
                href={"./outpage"}
                onClick={() => {
                  setCartOpen(!cartOpen);
                }}
                className="mt-4 cursor-pointer rounded-3xl  bg-[#F45867] px-4 py-2 text-center text-white"
              >
                Go to checkout
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Cart;
