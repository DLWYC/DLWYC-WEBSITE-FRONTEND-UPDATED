import {  X } from "lucide-react";
import { useState } from "react";
import MenuItems from "../../../data/Dashboard"
import { useNavigate } from "react-router-dom";



const SideBar = ({ isOpen, CloseSideBar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`font-rubik fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                  transition-transform duration-300 ease-in-out md:translate-x-0`}
    >

      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-primary-main">Camp Portal</h1>
        <button className="md:hidden" onClick={CloseSideBar}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col px-1">
        <ul className="w-full flex flex-col space-y-2">
          {MenuItems.map((item, idx) => (
            <li key={idx} className="hover:bg-primary-main transition-all duration-100 ease-in-out hover:text-white rounded-lg">
              <a
                // href={item.url}
                onClick={()=> navigate(item.url)}
                className="flex items-center space-x-3  "
              >
                {<item.icon className="w-5 h-5" />}
                <span>{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
