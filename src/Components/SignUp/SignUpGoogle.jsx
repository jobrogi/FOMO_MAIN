import React from "react";

function SignUpGoogle(props) {
  return (
    <div>
      <button className={props.button} aria-label="Sign In With Google">
        <div className="bg-White p-2 rounded me-1">
          <i className="fa-brands fa-google text-GoogleRed"></i>
        </div>
        <p className=" float-left text-White flex w-full justify-center">
          {props.text ? props.text : "Sign In with Google"}
        </p>
      </button>
    </div>
  );
}

export default SignUpGoogle;
