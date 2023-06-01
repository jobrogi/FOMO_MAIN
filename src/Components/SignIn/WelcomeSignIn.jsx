import React from "react";
import SignInButton from "./SignInButton";

function WelcomeSignIn() {
  return (
    <div className="w-80">
      <div className="border-2 border-white h-fit w-42 flex-wrap flex-col flex rounded justify-centers p-5">
        <p className="text-white text-xl w-fit mb-2">
          Already have an account?
        </p>

        <SignInButton
          text="Sign In with Us"
          button="text-White border-2 border-Green w-full rounded text-xl p-1 px-2"
        />
      </div>
    </div>
  );
}

export default WelcomeSignIn;
