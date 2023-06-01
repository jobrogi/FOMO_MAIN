import React from "react";
// import AuthContext from './AuthContext';

function Header() {
  return (
    //
    <div className="sticky top-0 z-50">
      <div className="absolute w-full h-full bg-black bg-gradient-to-tr from-DarkGray opacity-30 to-black -z-10"></div>
      <ul className="flex w-full text-white justify-evenly h-fit p-3 items-center">
        <li className="w-16">
          <i className="text-2xl fa-solid fa-cookie-bite">
            <h1 className="text-sm">ByteMe</h1>
          </i>
        </li>
        <li className="w-full px-6">
          <div className="w-full h-8 rounded-2xl bg-DarkGray relative">
            <i className="absolute top-2 left-2 text-md fa-solid fa-magnifying-glass "></i>

            <input
              className="w-full ps-8 rounded-2xl h-8 bg-transparent"
              type="search"
            />
          </div>
        </li>
        <li className="w-fit">
          <i className="text-xl fa-solid fa-gear"></i>
        </li>
      </ul>
    </div>
  );
}
export default Header;
