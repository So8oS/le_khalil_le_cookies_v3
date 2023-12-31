/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import OrdersHook from "../../lib/orderHook";
import { mutate } from "swr";
import { GiCook } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { IoIosCheckmarkCircle } from "react-icons/io";

// interface order {
//   id: number;
//   status: string;
//   date: string;
//   total: number;
//   user: {
//     name: string;
//     email: string;
//   };
//   items: {
//     name: string;
//     quantity: number;
//   }[];
// }

interface data {
  status: string;
  date: string;
}

const OrderList = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { data: Orders } = OrdersHook();
  const [updating, setUpdating] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const updateOrder = async (data: data) => {
    try {
      setUpdating(false);
      console.log(data);
      console.log(selectedOrderId);
      const { status, date } = data;
      await axios.post(`/api/updateOrder`, { updatedId: selectedOrderId, status, date });
      mutate("/api/getorders");
      reset(); // Reset the form after successful update
      axios.post("/api/email/orderStatus", { status: status, email: selectedEmail });

      setSelectedOrderId(null); // Reset the selectedOrderId
      setSelectedEmail(null); // Reset the selectedEmail
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-3xl bg-[#EEE5E5] p-5 shadow">
      <h1 className="text-3xl font-bold">Orders</h1>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-10">
        {/* @ts-ignore */}
        {Orders?.map((order, idx: number) => (
          <div key={idx} className="flex flex-col items-center gap-2 rounded-3xl bg-[#EBCC9B] p-5 shadow hover:scale-105">
            <div className="flex items-center justify-center gap-2">
              <img className="w-10" src="/customer.png" alt="customer" />
              <h1 className="font-Pacifico text-xl font-bold">{order?.user?.name.toUpperCase()}</h1>
            </div>
            <h1 className="text-xl font-bold">{order?.user?.email.toUpperCase()}</h1>
            <div className="flex h-24 flex-col">
              {/* @ts-ignore */}
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between gap-3">
                  <h1 className="text-lg">{item.name}</h1>
                  <h1 className="text-lg">{`X${item.quantity}`}</h1>
                </div>
              ))}
            </div>
            <h1 className="font-bold">{`Total: ${order.total} TL`}</h1>
            <h1 className="">{`Status: ${order.status}`}</h1>
            {updating && selectedOrderId === order.id ? (
              <>
                {/* @ts-ignore */}
                <form onSubmit={handleSubmit(updateOrder)} className="items flex flex-col items-center justify-center gap-3 ">
                  <div className="items center flex justify-center gap-2">
                    <div className="items flex flex-col items-center justify-center gap-1">
                      <IoIosCheckmarkCircle className="text-green-500" />
                      <input {...register("status")} type="radio" value={"delivered"} name="status" />
                    </div>
                    <div className="items flex flex-col items-center justify-center gap-1">
                      <GiCook className="" />
                      <input {...register("status")} type="radio" value={"preparing"} name="status" />
                    </div>
                    <div className="items flex flex-col items-center justify-center gap-1">
                      <FcCancel className="" />
                      <input {...register("status")} type="radio" value={"canceled"} name="status" />
                    </div>
                  </div>
                  <Controller control={control} name="date" render={({ field }) => <input type="date" {...field} className="rounded-3xl px-2 py-1" />} />
                  <button className="cursor-pointer rounded-3xl bg-[#F45867] px-4 py-2 text-white shadow" type="submit">
                    Submit
                  </button>
                </form>
                <button className="mb-10 cursor-pointer rounded-3xl bg-[#F45867] px-2 py-1 text-white shadow" onClick={() => setUpdating(false)}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="cursor-pointer rounded-3xl bg-[#F45867] px-2 py-1 text-white shadow"
                onClick={() => {
                  setUpdating(true);
                  //@ts-ignore
                  setSelectedOrderId(order.id);
                  setSelectedEmail(order.user.email);
                }}
              >
                Update
              </button>
            )}
            {<h1>{`delivery date: ${order.date}`}</h1>}
          </div>
        )).reverse()}
      </div>
    </div>
  );
};

export default OrderList;
