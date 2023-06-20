import React from "react";
import useCurrentUser from "../../lib/useCurrentUser";

const Details = () => {
  const { data: user } = useCurrentUser();
  console.log(user);
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-5 rounded-3xl bg-[#EBCC9B] p-10 shadow">
        <h1 className="text-3xl ">My Orders</h1>
        <div className="flex flex-wrap  justify-center gap-5  ">
          {user?.orders?.map((order) => (
            <div key={order.id} className=" flex flex-col justify-center  rounded-3xl bg-[#EEE5E5] p-7 shadow hover:scale-105">
              <div className="flex h-24 flex-col">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between gap-3">
                    <h1 className="text-lg">{item.name}</h1>
                    <h1 className="text-lg">{`X${item.quantity}`}</h1>
                  </div>
                ))}
              </div>
              {/* <h1>{order.createdAt}</h1> */}
              <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold">{`Total: ${order.total} TL`}</h1>
                <h1 className="">{`Status: ${order.status}`}</h1>
                <h1 className="">{`Delivery date: ${order.date}`}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
