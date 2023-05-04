import React, {useState} from "react";

function SignUp(){

    const [active, setActive] = useState(0);
    
    function setActiveContent(){
        if(active == 1){
            setActive(0);
        }
        if(active == 0){
            setActive(1);
        }
    }

    return(
        <div className="min-h-full bottom-0 absolute">
            <div className={active==1 ? "flex flex-wrap bg-black w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200" : "flex flex-wrap bg-black w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200 translate-y-12"}>
                <div className="text-white text-center w-full mb-1" onClick={setActiveContent}>
                    {active == 1? <i className="fa-solid fa-angle-down"></i> : <i className="fa-solid fa-angle-up"></i> }
                </div>
                <div className={active == 1 ? "flex justify-between w-full" : "flex justify-between w-full"}>
                    <p className="text-white p-1">Welcome to FOMO!</p>
                    <button className="text-white bg-blue-400 rounded-lg p-1" data-modal-show="modalID">Sign Up</button>
                    <h1 className="text-white bg-blue-400 rounded-lg p-1">Sign In</h1>
                </div>
            </div>

            <div
            class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                <h1>Pop Up Window</h1>
            </div>
        </div>
        
    )
}

export default SignUp;