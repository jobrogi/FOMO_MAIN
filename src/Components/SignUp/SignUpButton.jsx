import React, { useState } from "react";
import AuthContext from "../AuthContext";

function SignUpButton(props) {
  function handleSignUp(e) {
    e.preventDefault();

    var fName = document.getElementById("fName").value;
    var lName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var dob = document.getElementById("dob").value;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const year = dob.slice(0, 4);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (year >= currentYear - 13) {
      console.log("Under 13");
    } else {
      let url;
      if (window.location.hostname === "localhost") {
        url = "http://localhost:8080/signUp";
      } else {
        url = "https://pacific-citadel-02863.herokuapp.com/signUp";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({ fName, lName, email, dob, username, password }),
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
          const userData = {
            fName: data.user[0].fName,
            lName: data.user[0].lName,
            email: data.user[0].email,
            username: data.user[0].username,
          };
          console.log("DATA " + data);
          localStorage.setItem("sessionId", data.sessionId);
          localStorage.setItem("userData", JSON.stringify(userData));

          console.log(localStorage.getItem("userData"));
          setIsAuthenticated(true);
          setUser(userData);
          setCurrentPage(1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const { setIsAuthenticated, setUser } = React.useContext(AuthContext);
  const { setCurrentPage } = React.useContext(AuthContext);

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
        Sign Up
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
        <form
          method="POST"
          id="SignUp"
          className="w-full h-fit pointer-events-auto text-White mt-20"
        >
          <div>
            <p className="p-2 text-2xl text-White">Sign Up 1/2</p>
            <button
              type="button"
              value="Close"
              onClick={SetFormSection}
              className="text-White absolute top-0 right-0 p-2"
            >
              X
            </button>
          </div>
          <hr />
          <p className="p-4 mb-2 White">
            No Information will be shown or shared publicly. Your information is
            only used for security purposes.
          </p>

          <div className="border-2 flex flex-wrap justify-center p-2">
            <h1 className="bg-black text-White px-3 -mt-5 w-fit">
              First and Last Name
            </h1>
            <div className="flex flex-nowrap w-full">
              <input
                type="text"
                id="fName"
                className="p-3 mb-2 m-1 w-1/2 outline-none text-black"
                placeholder="First Name"
              />
              <input
                type="text"
                id="lName"
                className="p-3 mb-2 m-1 w-1/2 outline-none text-black"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
            <h1 className="bg-black text-dark-text px-3 -mt-5 w-fit">Email</h1>
            <input
              type="email"
              id="email"
              className="p-3 mb-2 m-1 w-full outline-none text-black"
              placeholder="Email Address"
            />
          </div>

          <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
            <h1 className="bg-black text-dark-text px-3 -mt-5 w-fit">
              Date of Birth
            </h1>
            <input
              type="date"
              id="dob"
              className="p-3 mb-2 m-1 w-full outline-none text-black"
              placeholder="Email Address"
            />
          </div>
          <button
            type="button"
            value={"Next"}
            onClick={SetFormSection}
            className="w-full bg-Green  p-2 mt-2 rounded-lg"
          >
            Next
          </button>
        </form>
      </div>

      {/* Sign Up Forrm Page 2 */}
      <div
        action="POST"
        form="SignUp"
        className={
          formSection === 2
            ? "fixed top-0 left-0 bg-black p-2 w-full"
            : "hidden"
        }
      >
        <div className="mt-20">
          <p className="p-2 text-2xl text-White">Sign Up 2/2</p>
          <button
            type="button"
            value="Close"
            onClick={SetFormSection}
            className="text-White absolute top-0 right-0 p-2"
          >
            X
          </button>
        </div>

        <hr />

        <p className="mt-2 mb-1 text-center font-bold text-White">
          Username & Password Tips
        </p>
        <ul className="p-2 text-White">
          <li>Avoid sensitive personal info.</li>
          <li>Do not include profanity in your username.</li>
          <li>Simple to remember but difficult to guess. </li>
          <li>
            Use a longer password and include numbers and special characters.
          </li>
        </ul>
        <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
          <h1 className="bg-black text-White px-3 -mt-5 w-fit">Username</h1>
          <input
            form="SignUp"
            type="text"
            id="username"
            className="p-3 mb-2 m-1 w-full outline-none text-black"
            placeholder="Enter Username"
          />
        </div>

        <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
          <h1 className="bg-black text-White px-3 -mt-5 w-fit">Password</h1>
          <input
            form="SignUp"
            type="password"
            id="password"
            className="p-3 mb-2 m-1 w-full outline-none text-black"
            placeholder="Enter Password"
          />
          {/* <input form="SignUp" type="text" className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Re Enter Password" /> */}
        </div>

        <div className="flex flex-nowrap">
          <button
            type="button"
            value={"Back"}
            onClick={SetFormSection}
            className="w-1/2 bg-Green p-2 mt-2 m-2 rounded-lg text-White"
          >
            Back
          </button>
          <button
            form="SignUp"
            type="submit"
            onClick={handleSignUp}
            className="w-1/2 bg-Green text-White  p-2 mt-2 m-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpButton;
