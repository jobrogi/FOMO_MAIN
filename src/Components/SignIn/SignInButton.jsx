import React, { useState } from "react";
import AuthContext from "../AuthContext";

function SignInButton(props) {
  function handleLogIn(e) {
    e.preventDefault();

    const username = document.getElementById("_username").value;
    const password = document.getElementById("_password").value;

    console.log(username + "  " + password);

    let url;
    if (window.location.hostname === "localhost") {
      url = "http://localhost:8080/logIn";
    } else {
      url = "https://pacific-citadel-02863.herokuapp.com/logIn";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("DATA" + data.user._id);
        const userData = {
          fName: data.user.fName,
          lName: data.user.lName,
          email: data.user.email,
          username: data.user.username,
          userId: data.user._id,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        localStorage.setItem("sessionId", data.sessionId);
        localStorage.setItem("userId", data.user._id);

        // console.log(localStorage.getItem("userData"));
        setIsAuthenticated(true);
        // setUser(userData);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.log("CATCH ERROR @ SIGN IN " + error);
      });
  }

  const { setIsAuthenticated, setUser, setCurrentPage } =
    React.useContext(AuthContext);

  const [formSection, setFormSection] = useState(0);

  function SetFormSection(e) {
    if (e.target.value === "Close") {
      setFormSection(0);
    }

    if (e.target.value === "Next") {
      setFormSection(formSection + 1);
    }
    if (e.target.value === "Back") {
      setFormSection(formSection - 1);
    }
  }

  return (
    <div className="">
      <button
        onClick={() => {
          setFormSection(1);
        }}
        className={props.button}
      >
        Sign In
      </button>
      <button
        value="Close"
        onClick={SetFormSection}
        className={
          formSection === 0
            ? ""
            : "backdrop-blur fixed top-0 left-0 w-screen h-screen"
        }
      ></button>

      <div
        className={
          formSection === 1
            ? "fixed top-0 left-0 bg-black p-2 w-full"
            : "hidden"
        }
      >
        <div className="text-white text-center w-full flex flex-wrap justify-center">
          <div>
            <p className="p-2 mb-5 text-2xl text-dark-text">Sign In</p>
            <button
              type="button"
              value="Close"
              onClick={SetFormSection}
              className="text-dark-text absolute top-0 right-0 p-2"
            >
              X
            </button>
          </div>

          <div className={formSection === 1 ? "justify-center mt-1" : "hidden"}>
            {/* Sign in with google */}
            <form
              method="POST"
              id="signIn"
              className="w-full h-fit pointer-events-auto "
            >
              <div className="flex flex-wrap justify-center p-2">
                <button
                  className="p-1 rounded mb-2 m-1 flex items-center w-full outline-none bg-GoogleBlue text-black"
                  aria-label="Sign In With Google"
                >
                  <div className="bg-White p-2 rounded">
                    <i className="fa-brands fa-google text-GoogleRed text-xl"></i>
                  </div>
                  <p className="text-xl float-left text-White flex w-full justify-center">
                    Sign in with Google
                  </p>
                </button>
              </div>
            </form>

            {/* Or */}
            <div className="flex w-full justify-center flex-wrap text-white mt-8">
              <hr className="w-full" />
              <p className="bg-black text-dark-text p-1 -mt-4">or</p>
            </div>

            {/* Sign in with our data. */}
            <form
              action="POST"
              id="SignIn"
              className="w-full h-fit pointer-events-auto "
            >
              <p>Login with Us 1/2</p>
              <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                <h1 className="bg-black text-dark-text px-3 -mt-5 w-fit">
                  Username
                </h1>
                <input
                  id="_username"
                  type="text"
                  className="p-3 mb-2 m-1 w-full outline-none text-black"
                  placeholder="Username"
                />
              </div>

              <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                <h1 className="bg-black text-dark-text px-3 -mt-5 w-fit">
                  Password
                </h1>
                <div className="flex items-center justify-center relative w-full p-0 m-0">
                  <input
                    id="_password"
                    type="password"
                    className="p-3 mb-2 m-1 w-full outline-none text-black pointer-events-auto auto"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <p className="mt-2 text-gray-300">Forgot Password?</p>

              <div className="flex flex-nowrap pointer-events-auto">
                <button
                  form="SignIn"
                  type="submit"
                  onClick={handleLogIn}
                  className="w-full bg-Green p-2 mt-2 m-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={
          formSection === 2
            ? "bg-black fixed top-0 w-full h-fit z-40 left-0 "
            : "hidden"
        }
      >
        <p>Login with Us 2/2</p>
      </div>
    </div>
  );
}

export default SignInButton;
