import React from "react";
import AuthContext from './AuthContext';


function Header(){
    const { isAuthenticated, user } = React.useContext(AuthContext);

    return(
        <div className="p-2 w-full">
            <ul className="flex items-center justify-between">
                <li>
                    <div className="text-yellow-50 text-3xl font-bold hover:cursor-pointer text-center">THE F.O.M.O</div>
                </li>
                <li className="m-5 w-full flex flex-nowrap">
                    <input type="text" className="w-full outline-none h-8 text-center rounded-s-xl text-md decoration" placeholder="..." />
                    <button className="w-16 bg-blue-300 placeholder-white text-white h-8 text-center rounded-e-xl text-md decoration px-2">Search</button>
                    {/* {isAuthenticated && <p className="text-white">Welcome, {user.username}!</p>} */}
                </li>
            </ul>

        </div>
    );
}
export default Header;