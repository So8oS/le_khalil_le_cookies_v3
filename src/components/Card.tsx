/* eslint-disable @next/next/no-img-element */
import React from "react";

interface details {
  pic: string;
  name: string;
  disc: string;
  price: string;
}

const Card = ({ pic, name, disc, price }: details) => {
  return (
    <div
      className=" bg-[#EBCC9B] h-[41rem]
     flex flex-col  items-center rounded-2xl overflow-hidden shadow-xl"
    >
      <img className="" src={pic} alt="dessert pic" />
      <div className="flex flex-col justify-center items-center px-5">
        <h2 className="text-2xl font-bold font-Pacifico mt-12 ">{name}</h2>
        <p className="text-[1.4rem] text-center mt-12 leading-5 ">{disc}</p>
        <h3 className="font-bold mt-4">{price}</h3>
        <button className="bg-[#F45867] text-white py-2 px-4 rounded-3xl mt-5 mb-10">Add to cart</button>
      </div>
    </div>
  );
};

export default Card;
