import { useState, useEffect } from "react";
import logoLight from "../assets/images/LogoLightTrans.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarDiscover() {
  const userProPic = useSelector((state) => state.app.user.img);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const imgSrc = userProPic
    ? `data:image/jpeg;base64,${arrayBufferToBase64(userProPic.data)}`
    : "";

  return (
    <div className="h-28 w-full flex justify-between items-center fixed relative">
      <div className="absolute h-4 w-full top-0 left-0 bg-gradient-to-br from-yellow-500 to-purple-500"></div>
      <Link className="flex items-center cursor-pointer" to="/discover">
        <img className="h-20 w-20" src={logoLight} alt="logo" />
        <span className="text-xl text-black font-bold">Expresso</span>
      </Link>
      <div className="mr-6 flex items-center gap-8">
        <Link to="/create">
          <button className="border-[3px] border-black shadow-md cursor-pointer font-bold tracking-wider px-2 py-1 rounded-md">
            Create Blog
          </button>
        </Link>
        <button className="border-[3px] border-black shadow-md cursor-pointer font-bold tracking-wider px-2 py-1 rounded-md">
          Profile Page
        </button>
        {userProPic && (
          <img
            className="h-12 w-12 rounded-full cursor-pointer shadow-md"
            src={imgSrc}
            alt="Profile"
          />
        )}
      </div>
    </div>
  );
}

export default NavbarDiscover;
