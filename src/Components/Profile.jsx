import React from "react";
import AuthContext from './AuthContext';


function Profile(props){

    function capitalizeFirstLetter(string){
        const firstLetter = string.slice(0,0)
        console.log('LETTER: ' + firstLetter)
        
    }
    return(
        <div className="w-full">
            <h1 onClick={capitalizeFirstLetter('gello')} className="text-center text-2xl text-white">{props.user.username}</h1>
        </div>
    )
}

export default Profile;