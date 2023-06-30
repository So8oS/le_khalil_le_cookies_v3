/* eslint-disable @next/next/no-img-element */
import React from "react";

const WhoAreWe = () => {
  return (
    <div className="flex items-center justify-center px-5 md:pt-20">
      <div className="mt-10 flex max-w-[70rem] flex-col items-center justify-center gap-5 rounded-3xl bg-[#EBCC9B] p-10 shadow">
        <img
          src="/khalilpic.jpg"
          alt="Khalil"
          className=" w-96 rounded-lg shadow"
        />
        <h1 className="rounded-xl bg-[#F45867] p-4 font-Pacifico text-3xl shadow">
          Khalil Selyan
        </h1>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-center text-xl font-medium md:text-2xl">
            {/* Let me tell you about my friend, the cookie lover turned entrepreneur. He has a thicc booty and an insatiable appetite for cookies. In his third year of uni, he started selling his
              mouthwatering creations, becoming the talk of the campus. But after ruling the cookie scene in his fourth year, he decided to take a break leaving his customers were devastated I built this
              website to help him get back on his feet and back into the cookie game(Not really). */}
            {`Let me introduce you to my friend, the cookie enthusiast turned entrepreneur. With a thicc booty and a passion for cookies, he started selling his mouthwatering treats in uni during his third year.
            
            After a successful run, he decided to take a break in his fourth year, leaving his customers yearning for his delicious creations. That's when I, his computer engineer friend, stepped in and built a website for him.
            
            Together, we created a virtual cookie haven, keeping his legacy alive online. It's a tale of friendship, cookies, and unexpected collaborations that brought joy to cookie lovers everywhere.`}
          </p>
          <p>{`what actully happend is , i designed the main page back then as a gift but i but never added functionaity because uhm well i did'nt know how to make it cuz i was a noobie,  i worked on in after a while but again did not add functionality , 2 years later after actually becoming a brilliant developer :p i rebooted this project and finally finished it.  `}</p>
          <p>{`Why "Le Khalil Le Cookies", he speaks freanch and i dont.`}</p>
        </div>
      </div>
    </div>
  );
};

export default WhoAreWe;
