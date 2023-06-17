/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAtom } from "jotai";
import { cartAtom, cartOpenAtom } from "../atoms";
import { TiDelete } from "react-icons/ti";
import Link from "next/link";

const Cart = () => {
  const [items, setItems] = useAtom(cartAtom);
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);

  return (
    <div className="  p-4 md:top-[3.25rem] md:right-1 top-60 shadow fixed md:absolute bg-[#EEE5E5] overflow-hidden border border-black rounded-xl  ">
      <div className="flex flex-col justify-center ">
        {items.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-xl">Cart is empty</h1>
            <button onClick={() => setCartOpen(false)} className="bg-[#F45867] text-white  py-2 px-4 rounded-3xl cursor-pointer mt-4">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold">Cart</h1>
              <button
                className="md:hidden"
                onClick={() => {
                  setCartOpen(!cartOpen);
                }}
              >
                <TiDelete className="text-red-500 w-6 h-6 " />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-4 ">
              {items.map((item, idx) => {
                return (
                  <div key={idx} className="flex justify-between items-center bg-[#EBCC9B] rounded-lg shadow-lg gap-3 p-2 shadow ">
                    <div className="flex gap-2 items-center">
                      <img src={item.pic} alt={item.name} className="w-20 shadow rounded-lg" />
                      <h1 className="w-28">{item.name}</h1>
                    </div>
                    <div className="flex justify-center items-center">
                      <h1 className="">{`${item.price}`}</h1>
                      <h1>TL</h1>
                    </div>
                    <h1>{item.quantity}X</h1>
                    <button
                      onClick={() => {
                        setItems((prev) => prev.filter((_, i) => i !== idx));
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
              className="text-center bg-[#F45867] text-white  py-2 px-4 rounded-3xl cursor-pointer mt-4"
            >
              Go to checkout
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
