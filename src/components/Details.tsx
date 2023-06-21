import React from "react";
import useCurrentUser from "../../lib/useCurrentUser";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const Details = () => {
  const { data: user } = useCurrentUser();
  const [orders, setOrders] = React.useState<any>(
    user?.orders?.map((order) => order)
  );
  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-5 rounded-3xl bg-[#EBCC9B] p-10 shadow">
        <h1 className="text-3xl ">My Orders</h1>
        <div className="flex flex-wrap  justify-center gap-5  ">
          {user?.orders?.map((order) => {
            return (
              <div
                key={order.id}
                className=" flex flex-col justify-center  rounded-3xl bg-[#EEE5E5] p-7 shadow hover:scale-105"
              >
                <div className="flex h-24 flex-col">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between gap-3">
                      <h1 className="text-lg">{item.name}</h1>
                      <div className="flex items-center justify-center gap-1 rounded-3xl bg-[#EEE5E5] px-1 ">
                        {order.status === "pending" && (
                          <AiFillMinusCircle
                            onClick={() => {
                              const itemIndex = order.items.findIndex(
                                (item: any) => item.name === name
                              );
                              if (itemIndex !== -1) {
                                // If the item exists, increment the quantity
                                const updatedItems = [...orders.items];
                                updatedItems[itemIndex].quantity -= 1;
                                // setOrderItems(updatedItems);
                              }
                            }}
                            className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
                          />
                        )}
                        <h1 className="text-lg">{`X${item.quantity}`}</h1>
                        {order.status === "pending" && (
                          <AiFillPlusCircle
                            onClick={() => {
                              const itemIndex = order.items.findIndex(
                                (item: any) => item.name === name
                              );
                              if (itemIndex !== -1) {
                                // If the item exists, increment the quantity
                                const updatedItems = [...orders.items];
                                updatedItems[itemIndex].quantity += 1;
                                // setOrderItems(updatedItems);
                              }
                            }}
                            className="h-4 w-4 cursor-pointer text-[#F45867] hover:scale-105"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {/* <h1>{order.createdAt}</h1> */}
                <div className="flex flex-col items-center justify-center">
                  <h1 className="font-bold">{`Total: ${order.total} TL`}</h1>
                  <h1 className="">{`Status: ${order.status}`}</h1>
                  <h1 className="">{`Delivery date: ${order.date}`}</h1>
                  {order.status === "pending" && (
                    <button className="mt-2 rounded-lg bg-[#F45867] px-4 py-2 font-bold text-white">
                      Update
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Details;
