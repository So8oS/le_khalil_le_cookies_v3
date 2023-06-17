/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAtom } from "jotai";
import { cartAtom, cartOpenAtom } from "../atoms";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";

const CheckOut = () => {
  const [items, setItems] = useAtom(cartAtom);
  const [cartOpen, setCartOpen] = useAtom(cartOpenAtom);

  const itemsWithoutId = items.map(({ id, ...rest }) => rest);
  console.log(itemsWithoutId);

  // Calculate the total price of all items
  const total = items.reduce((acc, item) => {
    const itemPrice = item.price * item.quantity;
    return acc + itemPrice;
  }, 0);

  const sendOrder = async () => {
    await axios.post("/api/addorder", {
      items: itemsWithoutId,
      total,
    });
  };

  return (
    <div className="p-4 shadow bg-[#EEE5E5] border border-black rounded-xl w-full max-w-[65rem]">
      <div className="flex flex-col justify-center">
        {items.length === 0 ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-xl">No Items Were Added</h1>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center gap-2">
              <img className="w-20" src="/logo.png" alt="logo" />
              <h1 className="text-3xl font-semibold text-center">Checkout</h1>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {items.map((item, idx) => {
                const totalPrice = item.quantity * item.price;
                return (
                  <div key={idx} className="flex sm:flex-row flex-col justify-between items-center bg-[#EBCC9B] rounded-lg text-xl gap-3 p-2  shadow md:hover:scale-105">
                    <div className="flex sm:flex-row flex-col justify-center text-center gap-2 items-center">
                      <img src={item.pic} alt={item.name} className="w-40 md:w-32 shadow rounded-lg" />
                      <h1 className="w-28">{item.name}</h1>
                    </div>
                    <div className="flex gap-5">
                      <h1>{`${item.price} TL`}</h1>
                      <div className="flex gap-1 justify-center items-center ">
                        <AiFillMinusCircle
                          onClick={() => {
                            item.quantity--;
                            setItems((prev) => [...prev]);
                          }}
                          className="w-5 h-5 text-[#F45867] cursor-pointer hover:scale-105"
                        />
                        <h1 className="">{item.quantity}X</h1>
                        <AiFillPlusCircle
                          onClick={() => {
                            item.quantity++;
                            setItems((prev) => [...prev]);
                          }}
                          className="w-5 h-5 text-[#F45867] cursor-pointer hover:scale-105"
                        />
                      </div>
                      <h1>{`${totalPrice} TL`}</h1>
                    </div>
                    <button
                      onClick={() => {
                        setItems((prev) => prev.filter((_, i) => i !== idx));
                      }}
                    >
                      <TiDelete className="text-[#F45867] w-7 h-7  " />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-right">
              <h2 className="text-lg font-semibold">Total Price: {total} TL</h2>
            </div>
          </>
        )}
        <button onClick={sendOrder} className="text-center bg-[#F45867] text-white  py-2 px-4 rounded-3xl cursor-pointer mt-4">
          Order
        </button>{" "}
      </div>
    </div>
  );
};

export default CheckOut;
