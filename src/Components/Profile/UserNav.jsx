import React from "react";
import AuthContext from "../AuthContext";

function UserNav(props) {
  const { setCurrentPage, setCurrentRoute } = React.useContext(AuthContext);
  return (
    // <div className="min-h-fit w-full  pointer-events-none">

    // // </div>

    <div className="sticky bottom-0 w-full mt-10">
      <div className="flex flex-wrap bg-black w-full bottom-0 px-4 transition-all duration-200">
        <div className="sm:flex flex flex-nowrap w-full justify-center">
          <ul className="w-full h-full flex text-center">
            {/* Home or Feed Tab */}
            <li
              className={
                props.currentPage === 0
                  ? "w-1/3 h-fit py-3 bg-Green"
                  : "w-1/3 h-fit py-3"
              }
              onClick={() => {
                setCurrentPage(0);
              }}
            >
              <button className="text-White text-sm">
                <i className="fa-solid fa-house"></i>
              </button>
            </li>
            {/* Search tab */}
            <li
              className={
                props.currentPage === 4
                  ? "w-1/3 h-fit py-3 bg-Green"
                  : "w-1/3 h-fit py-3"
              }
              // onClick={() => {
              //   setCurrentPage(4);
              // }}
            >
              {" "}
              <button className="text-white text-sm">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </li>
            {/* Profile tab */}
            <li
              className={
                props.currentPage === 1
                  ? "w-1/3 h-fit py-3 bg-Green"
                  : "w-1/3 h-fit py-3"
              }
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              {" "}
              <button className="text-white text-sm">
                <i className="fa-solid fa-user"></i>
              </button>
            </li>
          </ul>
          {props.currentPage === 2 ? (
            <div></div>
          ) : (
            <div>
              <button
                className="bg-Green text-white w-16 h-16 rounded-full absolute bottom-16 right-5"
                onClick={() => {
                  setCurrentPage(2);
                }}
              >
                {" "}
                <i className="fa-solid fa-plus text-dark-text text-xl"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserNav;
