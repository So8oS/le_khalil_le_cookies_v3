/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useAtom } from "jotai";
import { cartAtom, cartOpenAtom } from "../atoms";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const CheckOut = () => {
  const [items, setItems] = useAtom(cartAtom);
  const [error, setError] = React.useState();
  const notify = () => toast("Order Sent");
  const erorrnot = () => toast(error);
  const router = useRouter();

  const itemsWithoutId = items
    .map((item) => {
      // return only items with quantity > 0
      const { id, ...rest } = item;
      return rest.quantity > 0 ? rest : null;
    })
    .filter((item) => item !== null);

  // Calculate the total price of all items
  const total = items.reduce((acc, item) => {
    const itemPrice = item.price * item.quantity;
    return acc + itemPrice;
  }, 0);

  const sendOrder = async () => {
    try {
      await axios.post("/api/addorder", {
        items: itemsWithoutId,
        total,
      });
      notify();
      // set the quantity of all items to 0
      setItems((prev) => prev.map((item) => ({ ...item, quantity: 0 })));
      axios.post("/api/email/orderRecieved");

      router.push("/");
    } catch (error: string | any) {
      setError(error.response.data.error);
      erorrnot();
    }
  };

  return (
    <div className="w-full max-w-[65rem] rounded-xl border border-black bg-[#EEE5E5] p-4 shadow">
      <div className="flex flex-col justify-center">
        {items.every((item) => item.quantity === 0) ? (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-center text-xl">No Items Were Added</h1>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2">
              <img className="w-20" src="/logo.png" alt="logo" />
              <h1 className="text-center text-3xl font-semibold">Checkout</h1>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              {items.map((item, idx) => {
                if (item.quantity === 0) return null;
                const totalPrice = item.quantity * item.price;
                return (
                  <div key={idx} className="flex flex-col items-center justify-between gap-3 rounded-lg bg-[#EBCC9B] p-2 text-xl shadow  sm:flex-row md:hover:scale-105">
                    <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row">
                      <img src={item.pic} alt={item.name} className="w-40 rounded-lg shadow md:w-32" />
                      <h1 className="w-28">{item.name}</h1>
                    </div>
                    <div className="flex gap-5">
                      <h1>{`${item.price} TL`}</h1>
                      <div className="flex items-center justify-center gap-1 rounded-3xl bg-[#EEE5E5] px-1 ">
                        <AiFillMinusCircle
                          onClick={() => {
                            item.quantity--;
                            setItems((prev) => [...prev]);
                          }}
                          className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
                        />
                        <h1 className="">{item.quantity}X</h1>
                        <AiFillPlusCircle
                          onClick={() => {
                            item.quantity++;
                            setItems((prev) => [...prev]);
                          }}
                          className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
                        />
                      </div>
                      <h1>{`${totalPrice} TL`}</h1>
                    </div>
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
                      <TiDelete className="h-7 w-7 text-[#F45867]  " />
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
        <button onClick={sendOrder} className="mt-4 cursor-pointer rounded-3xl  bg-[#F45867] px-4 py-2 text-center text-white">
          Order
        </button>{" "}
      </div>
    </div>
  );
};

export default CheckOut;
