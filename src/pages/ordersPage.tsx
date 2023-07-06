import OrderList from "@/components/OrderList";
import { getSession } from "next-auth/react";
import React from "react";
import { NextPageContext } from "next";
import useCurrentUser from "../../lib/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const OrdersPage = () => {
  const { data: user } = useCurrentUser();
  return (
    <>
      {user?.role === "ADMIN" ? (
        <div className="px-4">
          <OrderList />
        </div>
      ) : (
        <div className="px-4">nothing to see here</div>
      )}
    </>
  );
};

export default OrdersPage;
