import React, {useState} from "react";
import Post from "./Post";

function Feed(){

    const [active, setActive] = useState(true);

    function setActiveButton(e){
        setActive(e.target.value);
    }

    return(
        <div className="p-2">
            <ul className="flex flex-nowrap justify-center ">
                <li onClick={setActiveButton} value={0} className={active === 0 ? "text-xl text-white transition-all duration-200 mx-10" : "text-white text-lg transition-all duration-200 mx-8"}>Following</li>

                {/* <li className="text-white">Following</li> */}
                <li onClick={setActiveButton} value={1}  className={active === 1 ? "text-xl text-white transition-all duration-200 mx-10" : "text-white text-lg transition-all duration-200 mx-8"}>For You</li>
            </ul>

            {/* Card */}
            <Post/>
        </div>
    );
}

export default Feed;