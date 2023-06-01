import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";

function SignInButton(props) {
  const { setIsAuthenticated, setCurrentPage } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogIn(e) {
    e.preventDefault();
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

        setIsAuthenticated(true);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.log("CATCH ERROR @ SIGN IN " + error);
      });
  }

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
        {props.text ? props.text : "Sign In"}
      </button>
      <button
        value="Close"
        onClick={SetFormSection}
        className={
          formSection === 0
            ? ""
            : "backdrop-blur fixed top-0 left-0 w-screen h-screen cursor-default"
        }
      ></button>

      <div
        className={
          formSection === 1
            ? "fixed top-0 left-0 flex items-center justify-center w-screen h-screen pointer-events-none"
            : "hidden"
        }
      >
        <div className="w-fit h-fit bg-black p-5 rounded flex flex-wrap pointer-events-auto">
          <div className="text-white ms-auto">
            <button
              onClick={() => {
                setFormSection(0);
              }}
            >
              X
            </button>
          </div>
          <div className="text-white text-center w-full">
            <div>
              <p className="p-2 mb-5 text-2xl text-dark-text">Sign In</p>
            </div>

            <div
              className={formSection === 1 ? "justify-center mt-1" : "hidden"}
            >
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
                    placeholder="ElonMusk1776"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
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
                      placeholder="qwerty"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
