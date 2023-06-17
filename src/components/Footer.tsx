import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

export const Footer = () => {
  return (
    <div className="flex justify-center items-center gap-8 shadow bg-[#eee5e5] h-12 mt-20">
      <a href="https://github.com/So8oS/le_khalil_le_cookies-V2" target="_blank">
        <AiFillGithub className="w-5 h-5" />
      </a>

      <a href="https://www.instagram.com/cookiemonster.ist/" target="_blank">
        <AiFillInstagram className="w-5 h-5" />
      </a>
    </div>
  );
};
