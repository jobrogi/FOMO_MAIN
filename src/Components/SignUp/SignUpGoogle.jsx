import { useEffect } from "react";

function SignUpGoogle(props) {
  function handleAuthWindow() {
    const authWindow = window.open(
      "http://localhost:8080/auth/google",
      "popup",
      "width=500, height=500"
    );

    // Send a message to the opened window
    authWindow.addEventListener("load", () => {
      authWindow.postMessage("Authentication started", "*");
    });
  }

  useEffect(() => {
    function handleMessage(event) {
      // Handle the message received from the new window
      const { data } = event;
      const message = data.message;
      const userData = data.userData;
      console.log(userData);
      // Process the data as needed
    }

    // Add event listener to listen for messages from any origin
    window.addEventListener("message", handleMessage);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  return (
    <div className="w-full justify-center flex hover:transition-all hover:scale-105 ease-in-out duration-150">
      <a
        href="http://localhost:8080/auth/google"
        target="popup"
        onClick={handleAuthWindow}
      >
        <div className="flex w-fit items-center bg-White p-2 rounded justify-center">
          <i className="fa-brands fa-google text-GoogleRed"></i>
          <p className=" text-black px-2">
            {props.text ? props.text : "Sign In with Google"}
          </p>
        </div>
      </a>
      {/* <button
        type="submit"
        className={props.button}
        onClick={handleGoogleAuth}
        aria-label="Sign In With Google"
      >
        <div className="bg-White p-2 rounded me-1">
          <i className="fa-brands fa-google text-GoogleRed"></i>
        </div>
        <p className=" float-left text-White flex w-full justify-center">
          {props.text ? props.text : "Sign In with Google"}
        </p>
      </button> */}
    </div>
  );
}

export default SignUpGoogle;
