import React, { useState } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms";
import { TiDelete } from "react-icons/ti";

interface details {
  pic: string;
  name: string;
  disc: string;
  price: string;
  cookie: any;
}

const Card = ({ pic, name, disc, price, cookie }: details) => {
  const [items, setItems] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);

    // Check if the item is already in the cart
    const itemIndex = items.findIndex((item) => item.name === name);
    if (itemIndex !== -1) {
      // If the item exists, increment the quantity
      const updatedItems = [...items];
      updatedItems[itemIndex].quantity += 1;
      setItems(updatedItems);
      setIsLoading(false);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setTimeout(() => {
        setItems((prev) => [...prev, { ...cookie, quantity: 1 }]);
        setIsLoading(false);
      }, 200);
    }
  };

  return (
    <div className="bg-[#EBCC9B] max-w-[22rem] shadow flex flex-col items-center rounded-3xl overflow-hidden md:hover:scale-105 md:transition-all md:duration-100 md:ease-in-out">
      <img className="w-[22rem]" src={pic} alt="dessert pic" />
      <div className="flex flex-col justify-center items-center mt-16 px-5">
        <h2 className="text-2xl font-bold font-Pacifico h-20">{name}</h2>
        <p className="text-[1.4rem] text-center leading-6 h-28 mt-6">{disc}</p>

        <div className="flex flex-col justify-center items-center mt-10 gap-3">
          <h3 className="font-bold text-lg">{`${price} TL`}</h3>
          <button className="bg-[#F45867] text-white text-xl py-2 px-4 rounded-3xl cursor-pointer mb-10 relative" onClick={handleAddToCart} disabled={isLoading}>
            {isLoading && (
              <span className="animate-spin absolute inset-0 flex items-center justify-center">
                {/* Add a spinning animation icon or element here */}
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
              </span>
            )}
            {!isLoading && "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
