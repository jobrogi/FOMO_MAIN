import React from "react";
import AuthContext from "../AuthContext";
import serverRequest from "../Requests";

function Settings() {
  function handleLogout() {
    console.log("Logging Out");

    serverRequest({
      route: "logout",
      headers: { "Content-Type": "application/json" },
      method: "post",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("err! " + err);
      });

    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
    localStorage.setItem("currentPage", 0);
    window.location.reload();
    console.log("Logged out");
  }

  const { setCurrentPage } = React.useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <button
        onClick={() => {
          setCurrentPage(1);
        }}
        className="p-2 text-white text-2xl"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <ul className="p-2 w-full flex flex-nowrap">
        <li
          onClick={handleLogout}
          className="bg-dark-primary w-full text-white p-2 flex flex-nowrap"
        >
          Sign Out{" "}
          <div className="ms-auto">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
