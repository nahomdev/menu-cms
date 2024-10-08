"use client";
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { FaFolder } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

const menuItems = [
  { icon: <FaFolder color="white" size={18} />, text: "Systems" },
  { icon: <RxDashboard size={18} />, text: "Systems Code" },
  { icon: <RxDashboard size={18} />, text: "Menus" },
  { icon: <RxDashboard size={18} />, text: "Property" },
  { icon: <RxDashboard size={18} />, text: "API list" },
];
const subMenuItems = [
  { icon: <RxDashboard size={18} />, text: "User and Group" },
  { icon: <RxDashboard size={18} />, text: "Competition" },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Menus");

  return (
    <nav className="flex flex-col h-screen bg-[#101828] min-w-[15vw] px-3">
      <header className="flex justify-between items-center w-full text-xs whitespace-nowrap max-w-[85px] text-stone-300 px-4 py-4">
        <div>
          <img src={Logo.src} alt="logo" className="h-10" />
        </div>
      </header>
      <section className="flex flex-col bg-red-100 min-h-screen bg-red-100 px-1 py-1 mt-4 text-xs bg-black bg-opacity-0">
        <div className="flex flex-col w-full p-2 bg-gray-800 rounded-lg border border-gray-800 border-solid">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-2.5 py-3 whitespace-nowrap cursor-pointer ${
                activeItem === item.text
                  ? "bg-lime-400 rounded-lg text-gray-800 font-semibold"
                  : "text-slate-500"
              }`}
              onClick={() => setActiveItem(item.text)}
            >
              {React.cloneElement(item.icon, {
                className:
                  activeItem === item.text ? "text-black" : "text-slate-500",
              })}
              <div
                className={`text-[14px] ${
                  activeItem === item.text ? "text-gray-800" : "text-slate-500"
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
        </div>
        {subMenuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 px-2.5 py-3 whitespace-nowrap cursor-pointer ${
              activeItem === item.text
                ? "bg-lime-400 rounded-lg text-gray-800 font-semibold"
                : "text-slate-500"
            }`}
            onClick={() => setActiveItem(item.text)}
          >
            {React.cloneElement(item.icon, {
              className:
                activeItem === item.text ? "text-black" : "text-slate-500",
            })}
            <div
              className={`text-[14px] ${
                activeItem === item.text ? "text-gray-800" : "text-slate-500"
              }`}
            >
              {item.text}
            </div>
          </div>
        ))}
      </section>
    </nav>
  );
}
