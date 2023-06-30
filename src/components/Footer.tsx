import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

export const Footer = () => {
  return (
    <div className="mt-20 flex h-12 items-center justify-center gap-8 bg-[#eee5e5] shadow">
      <a href="https://github.com/So8oS" target="_blank">
        <AiFillGithub className="h-5 w-5" />
      </a>

      <a href="https://www.instagram.com/cookiemonster.ist/" target="_blank">
        <AiFillInstagram className="h-5 w-5" />
      </a>
    </div>
  );
};
