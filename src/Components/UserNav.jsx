import React from "react";
import AuthContext from './AuthContext';


function UserNav(){
    const {setCurrentPage} = React.useContext(AuthContext);


    return (
        // <div className="min-h-fit w-full  pointer-events-none">
            
        // // </div>

        <footer className="sticky bottom-0 min-h-fit w-full mt-2  pointer-events-none m-0">
            <div className="flex flex-wrap bg-dark-primary w-full bottom-0 px-4 py-2 transition-all duration-200">
                <div className="sm:flex flex flex-nowrap w-full justify-center">
                    {/* <button className="bg-blue-500 absolute bottom-0 mb-28 text-white p-2 rounded" onClick={handleLogout}>LOGOUT</button> */}

                    <ul className="text-white flex items-center pointer-events-auto">
                        <li className="-me-3"><button className="bg-dark-border text-dark-text pe-4 p-2 rounded text-sm" onClick={()=>{setCurrentPage(0)}}>HOME</button></li>
                        <li className="relative z-20"><button className="bg-dark-accent-1 w-12 h-12 p-2 rounded-full text-xl" onClick={()=>{setCurrentPage(2)}} ><h1 className="text-xl mb-2">+</h1></button></li>
                        <li className="-ms-3"><button className="bg-dark-border text-dark-text ps-4 p-2 rounded text-sm" onClick={()=>{setCurrentPage(1)}}>Profile</button></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default UserNav;