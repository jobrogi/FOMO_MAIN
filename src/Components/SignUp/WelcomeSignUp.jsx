import React from "react";
import SignUpButton from "./SignUpButton";
import SignUpGoogle from "./SignUpGoogle";

function WelcomeSignUp() {
  return (
    <div className="w-80 mb-2">
      <div className="border-2 border-white h-fit w-42 flex-wrap flex-col flex rounded justify-centers p-5">
        <p className="text-white text-xl w-fit">New here? Sign up now!</p>
        <SignUpButton
          text="Sign Up with Us"
          button="text-White bg-Green rounded text-xl w-full p-1 px-2 mt-2"
        />
        <hr className="text-white my-5" />

        <p className="text-white self-center p-1 -mt-10 bg-Black w-fit">or</p>
        <SignUpGoogle
          text="Sign Up with Google"
          button="text-White bg-GoogleBlue rounded text-xl w-full p-1 px-2 mt-2 flex items-center"
        />
      </div>
    </div>
  );
}
export default WelcomeSignUp;
