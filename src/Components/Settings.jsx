import React from "react";
import AuthContext from "./AuthContext";

function Settings() {
  function handleLogout() {
    console.log("Logging Out");

    let url;
    if (window.location.hostname === "localhost") {
      url = "http://localhost:8080/logout";
    } else {
      url = "https://pacific-citadel-02863.herokuapp.com/logout";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message); // Display the response message in the console
      })
      .catch((error) => {
        console.error("Error:", error); // Display any errors that occurred
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
        className="p-2 text-dark-text text-2xl"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <ul className="p-2 w-full flex flex-nowrap">
        <li
          onClick={handleLogout}
          className="bg-dark-primary w-full text-dark-text p-2 flex flex-nowrap"
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
