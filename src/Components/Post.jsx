import React from "react";
import data from "../UserData.json";

function Post(){
    return(
        
        <div className="flex w-full flex-wrap mt-2">
            
            {data.map((data) => (
                <div  key={data.id}>
                    <div className="flex w-full flex-nowrap items-center mt-2">
                        <img className="w-16 h-16 rounded-full" src={data.ProfileImg} alt="" />
                        <div className="ms-2">
                            <h1 className=" text-white font-bold w-full">{data.Name}</h1>
                            <p className="text-white">{data.PostDesc}</p>
                        </div>
                    </div>

                    <div className="ms-16 mt-2 w-fit">
                        <img className=" rounded-xl" src={data.ImgSrc} alt="" />
                        <ul className="flex w-full justify-evenly mt-1">
                            <li className="text-white"><i className="fa-solid fa-heart"></i> {data.Likes}</li>
                            <li className="text-white"><i className="fa-solid fa-comment"></i> {data.Comments}</li>
                            <li className="text-white"><i className="fa-solid fa-share"></i></li>
                        </ul>
                    </div>
                    

                    <hr className="border-black mt-2 w-full"/>
                    
                </div>
                

            ))}
        </div>
    );
}

export default Post;