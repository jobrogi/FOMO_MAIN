import React from "react";
import AuthContext from './AuthContext';


function Profile(props){
    const {setCurrentPage} = React.useContext(AuthContext);
    const userData = JSON.parse(localStorage.getItem('userData'));

    
    return(
        <div className="w-full min-h-full">
            <div className="min-h-fit w-full flex flex-wrap justify-center">
                <div onClick={()=>{setCurrentPage(3)}} className="w-full flex justify-end p-3 text-2xl text-dark-text"><i className="fa-solid fa-gear"></i></div>
                <div className="bg-dark-text w-20 h-20 mb-4 rounded-full relative">
                    {/* If image display image if not display add image */}
                    <div className="w-full h-full flex flex-wrap justify-center items-center relative">
                        <i className="fa-solid fa-image text-2xl font-bold w-full text-center text-gray-500"></i>
                    </div>
                </div>
                <h1 className="text-center text-xl text-dark-text w-full">@{userData.username}</h1>
                <ul className="flex w-full justify-center mt-4 text-center">
                    <li className="mx-3 flex flex-wrap text-center w-full">
                        <h1 className="w-full text-dark-text font-bold ">{'468'}</h1>
                        <h1 className="w-full text-sm text-gray-400">Following</h1>
                    </li>
                    <li className="mx-3 flex flex-wrap text-center w-full">
                        <h1 className="w-full text-dark-text font-bold ">{'32M'}</h1>
                        <h1 className="w-full text-sm text-gray-400">Followers</h1>
                    </li>
                    <li className="mx-3 flex flex-wrap text-center w-full">
                        <h1 className="w-full text-dark-text font-bold ">{'19M'}</h1>
                        <h1 className="w-full text-sm text-gray-400">Likes</h1>
                    </li>
                </ul>
                <hr className="text-white w-full mt-5" />

                {/* Test to see if objects can stay in grid of 3 rows */}
                {/* Later when implementing pictures or videos to to fit the height to aspect */}
                <div className="grid grid-cols-3 gap-1 w-full sm:w-3/4 md:w-2/4 xl:w-1/4">
                    <div className="bg-gray-200 h-32">Post 1</div>
                    <div className="bg-gray-200 h-32">Post 2</div>
                    <div className="bg-gray-200 h-32">Post 3</div>
                    <div className="bg-gray-200 h-32">Post 4</div>
                    <div className="bg-gray-200 h-32">Post 5</div>
                    <div className="bg-gray-200 h-32">Post 6</div>
                    <div className="bg-gray-200 h-32">Post 7</div>
                    <div className="bg-gray-200 h-32">Post 8</div>
                    <div className="bg-gray-200 h-32">Post 9</div>
                    <div className="bg-gray-200 h-32">Post 10</div>
                    <div className="bg-gray-200 h-32">Post 11</div>
                    <div className="bg-gray-200 h-32">Post 12</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;