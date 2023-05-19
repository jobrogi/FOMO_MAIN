import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';


function Profile(props){
    const {setCurrentPage} = React.useContext(AuthContext);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [posts, setPosts] = useState([]);




    useEffect(() => {
        const userData = localStorage.getItem('userData');

        let url;
        if (window.location.hostname === 'localhost') {
          url = 'http://localhost:8080/getPosts';
        } else {
          url = 'https://pacific-citadel-02863.herokuapp.com/getPosts';
        }
    
        // Append user data as query parameters to the URL
        const urlWithParams = new URL(url);
        urlWithParams.searchParams.append('userData', userData);
    
        fetch(urlWithParams)
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            setPosts(data); // Update the state with the received posts
        })
          .catch(error => {
            // Handle the error
          });
      }, []); // Add any dependencies that should trigger the fetch request

      const togglePostSettings = (postId) => {
        setPosts(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? { ...post, postSettings: !post.postSettings } : post
          )
        );
      };

    // function handleDeletePost(postId){
    //     console.log("POST ID " + postId)

    //     let url;
    //     if (window.location.hostname === 'localhost') {
    //     url = 'http://localhost:8080/deletePost';
    //     } else {
    //     url = 'https://pacific-citadel-02863.herokuapp.com/deletePost';
    //     }

    //     fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ postId, username: userData.username }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Handle the response data
    //         // Refresh the profile page.

    //         window.location.reload();

    //         console.log('Post deleted successfully:', data);
    //         // Update the posts state if needed
    //     })
    //     .catch(error => {
    //         // Handle the error
    //         console.error('Error deleting post:', error);
    //     });
    // }

   





    

    
    return(
        <div className=" min-h-screen w-full">
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
            {posts.map((post) => (
                <div className="bg-gray-200 relative overflow-hidden" key={post._id}>
                    <div
                    className="aspect-w-1 aspect-h-1 flex items-center justify-center"
                    style={{ minHeight: '200px' }} // Adjust the minimum height as needed
                    >
                    <div className="w-full h-full">
                        <img
                        className="object-cover object-center h-full w-full"
                        src={post.imageData}
                        alt="Image"
                        />
                    </div>
                    </div>
                </div>
            ))}
</div>










            </div>
        </div>
    )
}

export default Profile;