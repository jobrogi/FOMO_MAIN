import React, {useEffect, useState} from "react";
import AuthContext from './AuthContext';


function UserNav(){
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [user, setUser] = React.useState(null);

    const [active, setActive] = useState(1);
    
    function setActiveContent(){
        if(active == 1){
            setActive(0);
        }
        if(active == 0){
            setActive(1);
        }
    }

    return (
        <div className="min-h-full w-full bottom-0 absolute pointer-events-none">
            <div className={active== 1 ? "flex flex-wrap bg-black w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200" : "flex flex-wrap bg-gradient-to-b from-transparent to-gray-900 w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200 translate-y-16"}>
                <div className="text-white text-center w-full mb-1  pointer-events-auto" >
                    {active == 1? <button aria-label="Sign Up Button" onClick={setActiveContent}><i className="fa-solid fa-angle-down"></i></button> : <button onClick={setActiveContent}><i className="fa-solid fa-angle-up"></i></button> }
                </div>
                <div className={active == 1 ? "flex justify-center items-baseline w-full" : "flex justify-center w-full"}>
                    <div className="sm:flex flex flex-nowrap w-full justify-center">
                        <ul className="text-white flex pointer-events-auto">
                            <li className="m-1"><button className="bg-blue-500 p-2 rounded">HOME</button></li>
                            <li className="m-1"><button className="bg-blue-500 p-2 rounded">+</button></li>
                            <li className="m-1"><button className="bg-blue-500 p-2 rounded">Profile</button></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserNav;