import React from "react";

function Header(){
    return(
        <div className="p-2 w-screen">
            <ul className="flex items-center justify-between">
                <li>
                    <div className="text-yellow-50 text-3xl font-bold hover:cursor-pointer">FOMO</div>
                </li>
                <li className="m-5 w-full">
                    <input type="search" className="w-full text-center rounded-xl" placeholder="Search FOMO..." />
                </li>
            </ul>

        </div>
    );
}
export default Header;