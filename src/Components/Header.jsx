import React, { useState } from "react";
import SignInButton from "./SignIn/SignInButton";
import SignUpButton from "./SignUp/SignUpButton";
// import AuthContext from './AuthContext';

function Header() {
  // const { isAuthenticated, user } = React.useContext(AuthContext);
  const [headerMenu, headerMenuActive] = useState(false);

  return (
    <div className="z-20 w-full sticky top-0 bg-black">
      {/* Top Menu with search bar and hamburger icon */}
      <ul className="flex items-center justify-center">
        <li className="flex px-4 w-fit justify-between">
          <button
            onClick={() => {
              headerMenuActive(!headerMenu);
            }}
            className="w-fit"
          >
            <i className="fa-solid fa-bars text-3xl text-White"></i>
          </button>
        </li>
        {/* <li>
                    <div className="text-dark-text text-3xl font-bold hover:cursor-pointer text-center">THE F.O.M.O</div>
                </li> */}

        <li className="m-5 w-full flex flex-nowrap">
          <input
            type="text"
            className="w-full outline-none h-8 text-center rounded-s-xl text-md decoration"
            placeholder="..."
          />
          <button className="w-16 bg-Green placeholder-white text-white h-8 text-center rounded-e-xl text-md decoration">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {/* {isAuthenticated && <p className="text-white">Welcome, {user.username}!</p>} */}
        </li>
      </ul>

      {/* Menu Left */}
      {headerMenu === true && (
        <div className="absolute top-0 left-0 w-full h-screen z-20">
          {/* Button if they press off the nav screen */}
          <button
            className="w-full h-full"
            onClick={() => {
              headerMenuActive(!headerMenu);
            }}
          ></button>
          {/* Another Hamburger Button to close the nav screen */}
          <div className="bg-black w- md:w-1/4 lg:w-64 h-screen absolute top-0 z-30 shadow-2xl shadow-black flex flex-col flex-wrap justify-start p-2">
            <div className="flex w-full flex-nowrap h-fit justify-between items-center">
              <ul className="w-3/4 h-fit">
                <li>
                  <div className="text-White text-4xl font-bold hover:cursor-pointer text-center w-full h-fit">
                    ByteMe
                  </div>
                </li>
              </ul>
              <button
                className="h-fit w-fit"
                onClick={() => {
                  headerMenuActive(!headerMenu);
                }}
              >
                <i className="h-fit fa-solid fa-bars text-3xl text-White float-left"></i>
              </button>
            </div>

            <ul className="flex flex-wrap w-full justify-center mt-8 ">
              {/* Later make the items have a bg color based on which page is showing at the time */}
              <li className="text-xl text-White w-full text-center p-2">
                <button>Home</button>
              </li>
              <li className="text-xl text-White w-full text-center p-2">
                <button>Profile</button>
              </li>
              <li className="text-xl text-White w-full text-center p-2">
                <button>Settings</button>
              </li>

              {/* Sign in and Sign Up Page */}
              <div className="mt-4 w-full">
                <SignUpButton button="text-xl text-White w-full text-center p-2 bg-Green rounded" />
                <SignInButton button="text-xl text-White w-full text-center p-2 border-2 border-Green rounded mt-2" />
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
