import React from "react";
import data from "../UserData.json";

function Post(){
    return(
        <div className="flex w-full sm:justify-center">
            <div className="flex w-full flex-wrap mt-2 sm:w-3/4 md:w-1/2 lg:w-2/6 sm:border-gray-600 sm:border-s-2 sm:border-e-2 sm:p-2">
            
            {data.map((data) => (
                <div className="w-full" key={data.id}>
                    {/* Profile Image, Profile Username, Post Description */}
                    <div className="flex w-full flex-nowrap mt-2">
                        <img className="w-16 h-16 rounded-full" src={data.ProfileImg} alt="" />
                        <div className="ms-2">
                            <h1 className=" text-white font-bold w-full">{data.Name}</h1>
                            <p className="text-white">{data.PostDesc}</p>
                        </div>
                    </div>

                    {/* Post Image or Video / Post Interactions */}
                    <div className="flex flex-wrap ms-16 mt-2 w-fit ">
                        <img className=" rounded-xl min-w-full" src={data.PostImg} alt="" />
                        <ul className="flex w-full justify-evenly mt-1">
                            <li className="text-white"><i className="fa-solid fa-heart"></i> {data.Likes}</li>
                            <li className="text-white"><i className="fa-solid fa-comment"></i> {data.Comments}</li>
                            <li className="text-white"><i className="fa-solid fa-share"></i></li>
                        </ul>
                    </div>
                    

                    <hr className="border-gray-600  mt-2 w-full"/>
                    
                </div>
                

                ))}
            </div>
        </div>
        
    );
}

export default Post;