import React from "react";

function Header(){
    return(
        <div className="p-5 w-screen">
            <ul className="flex items-center">
                <li>
                    <div className="text-yellow-50 text-4xl font-bold hover:cursor-pointer">FOMO</div>
                </li>
                <li className="ms-auto">
                    <div className="text-yellow-50 text-xl">Sign Up</div>
                </li>
            </ul>

        </div>
    );
}
export default Header;