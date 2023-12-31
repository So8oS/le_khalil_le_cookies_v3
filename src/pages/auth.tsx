/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback } from "react";
import { MdEmail } from "react-icons/md";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { AiOutlineGoogle } from "react-icons/ai";
import { getSession, signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { set, useForm } from "react-hook-form";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const [varient, setVarient] = React.useState("login");
  const [error, setError] = useState<string | null>(null); // State variable for holding the error message
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleVarient = useCallback(() => {
    setVarient((currentVarient) => (currentVarient === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      const { email, password } = data;
      setLoading(true);
      try {
        const response = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false,
        });
        setLoading(false);

        if (response?.error) {
          setError(response.error);
        }
        if (!response?.error) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [router]
  );

  const userRegister = useCallback(
    async (data: { name: string; email: string; password: string }) => {
      setLoading(true);
      const { name, email, password } = data;
      try {
        await axios.post("/api/register", {
          name: name,
          email: email,
          password: password,
        });
        console.log(name, email);
        axios.post("/api/email/send", { name: name, email: email.toLowerCase() });

        console.log("success");
        login(data);
        setLoading(false);
      } catch (err: any) {
        console.log("error", err.response.data.error);
        setError(err.response.data.error);
      }
    },
    [login]
  );

  return (
    // Page
    <div className="flex min-h-screen flex-col items-center justify-center px-4 ">
      {/* Component */}
      <div className="flex w-full max-w-[30rem] flex-col items-center justify-center rounded-3xl bg-[#EBCC9B] py-14 shadow  ">
        <div className="flex items-center justify-center gap-2">
          <img className="w-24" src="/logo.png" alt="logo" />
          <h1 className="font-Pacifico text-[2.5rem] font-bold">{varient === "login" ? "Sign In" : "Register"}</h1>
        </div>
        {/* Form */}
        {error && <p className="animate-pulse text-red-500">{error}</p>}
        <form
          onSubmit={
            varient === "login"
              ? // @ts-ignore
                handleSubmit(login)
              : // @ts-ignore
                handleSubmit(userRegister)
          }
        >
          <div className="mt-6 flex flex-col items-center justify-center gap-7   ">
            {varient === "register" && (
              <div className="flex h-16 w-full  flex-row items-center  gap-2 rounded-xl border  bg-white pl-2 text-xl shadow outline-none ">
                <AiOutlineUser className="w-5 text-[#828282]" />
                <input className="w-full outline-none " {...register("name")} type="text" placeholder="Name" />
              </div>
            )}
            <div className="flex h-16 w-full  flex-row items-center  gap-2 rounded-xl border  bg-white pl-2 text-xl shadow outline-none ">
              <MdEmail className="w-5 text-[#828282]" />
              <input className="w-full  outline-none " {...register("email", { required: "Email is required" })} type="email" placeholder="Email" />
            </div>
            {/*@ts-ignore */}
            {errors.email && (
              <p className="animate-pulse text-red-500">
                {/* @ts-ignore */}
                {errors.email.message}
              </p>
            )}
            <div className="flex h-16 w-full flex-row items-center gap-2  rounded-xl border bg-white  pl-2 text-xl shadow outline-none sm:min-w-[17rem] ">
              <AiFillLock className="w-5 text-[#828282]" />
              <input className="w-full  outline-none" {...register("password", { required: "Password is required" })} type="password" placeholder="Password" />
            </div>
            {/*@ts-ignore */}
            {errors.password && (
              <p className="animate-pulse text-red-500">
                {/* @ts-ignore */}
                {errors.password.message}
              </p>
            )}
            {loading ? (
              <button className="text h-9 w-full animate-pulse rounded-3xl bg-[#F45867] text-white shadow" type="submit">
                Loading...
              </button>
            ) : (
              <button className="text h-9 w-full rounded-3xl bg-[#F45867] text-white shadow " type="submit">
                {varient === "login" ? "Sign In" : "Register"}
              </button>
            )}
          </div>
        </form>
        <div className="mt-5 flex flex-col items-center justify-center gap-4">
          {/* <p className="text-lg">or continue with</p>
          <div className="flex gap-5">
            <div
              className=" flex cursor-pointer items-center justify-center  rounded-full border border-[#828282] p-2"
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/account",
                });
              }}
            >
              <AiOutlineGoogle className="text-[#828282]" />
            </div>
          </div> */}
          <span>
            {" "}
            {varient === "login" ? "Not a member? " : "Already a member? "}
            <a
              onClick={() => {
                toggleVarient();
              }}
              className="cursor-pointer text-[#2D9CDB]"
            >
              {varient === "login" ? "Register" : "Sign In"}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
