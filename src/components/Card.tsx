import React from "react";
import { useAtom } from "jotai";
import { ICartItem, cartAtom } from "../atoms";
import { toast } from "react-toastify";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Card = ({ pic, name, disc, price, quantity }: ICartItem) => {
  const [items, setItems] = useAtom(cartAtom);
  const notify = () =>
    toast.success("Item Added To Cart", {
      toastId: "itemAdded",
    });

  const handleAddToCart = () => {
    // Check if the item is already in the cart
    const itemIndex = items.findIndex((item) => item.name === name);
    if (itemIndex !== -1) {
      // If the item exists, increment the quantity
      const updatedItems = [...items];
      updatedItems[itemIndex].quantity += 1;
      setItems(updatedItems);
      notify();
    } else {
      // If the item is not in the cart, add it with quantity 1
      setItems((prev) => [...prev, { pic, name, disc, price, quantity: 1 }]);
      notify();
    }
  };

  return (
    <div className="flex max-w-[22rem] flex-col items-center overflow-hidden rounded-3xl bg-[#EBCC9B] shadow md:transition-all md:duration-100 md:ease-in-out md:hover:scale-105">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="w-[22rem]" src={pic} alt="dessert pic" />
      <div className="mt-16 flex flex-col items-center justify-center px-5">
        <h2 className="h-20 font-Pacifico text-2xl font-bold">{name}</h2>
        <p className="mt-6 h-28 text-center text-[1.4rem] leading-6">{disc}</p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <h3 className="text-lg font-bold">{`${price} TL`}</h3>
          {quantity !== 0 ? (
            <div className="mb-10 flex items-center justify-center gap-1 rounded-3xl bg-[#EEE5E5]  px-4 py-2 ">
              <AiFillMinusCircle
                onClick={() => {
                  if (quantity >= 1) {
                    const itemIndex = items.findIndex(
                      (item) => item.name === name
                    );
                    if (itemIndex !== -1) {
                      // If the item exists, increment the quantity
                      const updatedItems = [...items];
                      updatedItems[itemIndex].quantity -= 1;
                      setItems(updatedItems);
                    }
                  }
                }}
                className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
              />

              <h1 className="text-xl">{quantity}X</h1>
              <AiFillPlusCircle
                onClick={() => {
                  if (quantity >= 1) {
                    const itemIndex = items.findIndex(
                      (item) => item.name === name
                    );
                    if (itemIndex !== -1) {
                      // If the item exists, increment the quantity
                      const updatedItems = [...items];
                      updatedItems[itemIndex].quantity += 1;
                      setItems(updatedItems);
                    }
                  }
                }}
                className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
              />
            </div>
          ) : (
            <button
              className="relative mb-10 cursor-pointer rounded-3xl bg-[#F45867] px-4 py-2 text-xl text-white"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
