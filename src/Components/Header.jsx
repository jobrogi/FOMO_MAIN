import React, { useState } from "react";
import SignInButton from "./SignIn/SignInButton";
import SignUpButton from "./SignUp/SignUpButton";
// import AuthContext from './AuthContext';

function Header() {
  // const { isAuthenticated, user } = React.useContext(AuthContext);
  const [headerMenu, headerMenuActive] = useState(false);

  return (
    <div className="z-20 w-full sticky top-0 bg-dark-background">
      {/* Top Menu with search bar and hamburger icon */}
      <ul className="flex items-center justify-center">
        <li className="flex w-1/4 justify-center">
          <button
            onClick={() => {
              headerMenuActive(!headerMenu);
            }}
          >
            <i className="fa-solid fa-bars text-3xl text-dark-text"></i>
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
          <button className="w-16 bg-dark-accent-1 placeholder-white text-dark-text h-8 text-center rounded-e-xl text-md decoration">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {/* {isAuthenticated && <p className="text-white">Welcome, {user.username}!</p>} */}
        </li>
      </ul>

      {/* Menu Left */}
      {headerMenu === true && (
        <div className="absolute top-0 left-0 w-screen h-screen z-20">
          {/* Button if they press off the nav screen */}
          <button
            className="w-screen h-screen"
            onClick={() => {
              headerMenuActive(!headerMenu);
            }}
          ></button>
          {/* Another Hamburger Button to close the nav screen */}
          <div className="bg-dark-background w-3/4 h-screen absolute top-0 z-30 shadow-2xl shadow-black flex flex-col flex-wrap justify-start p-2">
            <div className="flex w-full flex-nowrap h-fit justify-between items-center">
              <ul className="w-3/4 h-fit">
                <li>
                  <div className="text-dark-text text-4xl font-bold hover:cursor-pointer text-center w-full h-fit">
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
                <i className="h-fit fa-solid fa-bars text-3xl text-dark-text float-left"></i>
              </button>
            </div>

            <ul className="flex flex-wrap w-full justify-center mt-8 ">
              {/* Later make the items have a bg color based on which page is showing at the time */}
              <li className="text-xl text-dark-text w-full text-center p-2">
                <button>Home</button>
              </li>
              <li className="text-xl text-dark-text w-full text-center p-2">
                <button>Profile</button>
              </li>
              <li className="text-xl text-dark-text w-full text-center p-2">
                <button>Settings</button>
              </li>

              {/* Sign in and Sign Up Page */}
              <div className="mt-4 w-full">
                <SignUpButton button="text-xl text-dark-text w-full text-center p-2 bg-dark-accent-1 rounded" />
                <SignInButton button="text-xl text-dark-text w-full text-center p-2 border-2 border-dark-accent-1 rounded mt-2" />
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
