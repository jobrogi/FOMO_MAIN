import React, {useState} from "react";
import SignUpButton from "./SignUp/SignUpButton";
import SignInButton from "./SignIn/SignInButton";

function BottomNav(){
    const [active, setActive] = useState(true);

    return(
        <div className="min-h-fit w-full bottom-0 absolute ">
            <div className={active=== true ? "flex flex-wrap bg-black w-full fixed bottom-0 px-4 pb-2 transition-all duration-200" : "flex flex-wrap bg-gradient-to-b from-transparent to-gray-900 w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200 translate-y-16"}>

              {/* Down Arrow to enable and disable the bottom nav component */}
                <div className="text-white text-center w-full mb-1" >
                    {active === true ? <button className="outline-none" onClick={()=>{setActive(false)}} aria-label="Sign Up Button"><i className="fa-solid fa-angle-down"></i></button> : <button className="outline-none" onClick={()=>{setActive(true)}}><i className="fa-solid fa-angle-up"></i></button> }
                </div>

                {/* Sign in and Sign Up Buttons */}
                <div className={active === true ? "flex justify-center items-baseline w-full" : "flex justify-center w-full"}>
                    <div className="sm:flex flex flex-nowrap w-full justify-center">
                      <SignUpButton button='text-dark-text bg-dark-accent-1 rounded text-xl p-1 px-2 m-2'/>
                      <SignInButton button='text-dark-text border-2 border-dark-accent-1 rounded text-xl p-1 px-2 m-2'/>
                    </div>
                </div>

            </div>
        </div>
        
    )
}


export default BottomNav;