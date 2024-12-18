import React from "react";
import { NavLink } from "react-router-dom";

const BannerComponent = ({
  url = "",
  title = "",
  link = "",
  className = "",
  typeGood = "",
}: {
  url: string;
  title: string;
  link: string;
  className: string;
  typeGood: string;
}) => {
  return (
    <NavLink to={link} className={`relative ${className}`}>
      <img src={url} alt="" className="w-full h-full object-top object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-35"></div>
      <div className="absolute italic shadow-lg text-gray-500 top-5 text-sm left-5 bg-white rounded-full px-4 py-0.5">
        {typeGood}
      </div>
      <div className="text-gray-100 w-full h-full absolute top-0 left-0 flex items-center justify-center">
        <span className=" text-xl border-b px-4 py-0.5">{title}</span>
      </div>
    </NavLink>
  );
};

export default BannerComponent;
