import React, {useState} from "react";
import ImageHandler from './ImageUploader';
import AuthContext from './AuthContext';
import axios from 'axios';
import ImageResizer from 'react-image-file-resizer';
import { resolvePath } from "react-router-dom";



function AddPost(){

    const [imageData, setImageData] = useState('');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const {setCurrentPage} = React.useContext(AuthContext);



    async function handlePost () {
        if (imageData != null) {
          if (imageData.base64Data !== '') {
            const { file } = imageData;
            const reader = new FileReader();
            reader.onloadend = async function () {
              const convertedBase64Data = reader.result;

              const resizedImage = await new Promise((resolve) =>{
                ImageResizer.imageFileResizer(
                    file,
                    500,
                    500,
                    'JPEG',
                    50,
                    0,
                    (uri) => {
                        resolve(uri);
                    },
                    'base64'
                  )
              });

            //   sendPostData(convertedBase64Data);
              sendPostData(resizedImage);

            };
            reader.readAsDataURL(file);
          } else {
            console.log('Image file missing');
          }
        }
        // Rest of the function code...
      }

    // function sendPostData(base64Data){

    //     const postDesc = document.getElementById('postDesc').value
    //     let url;
    //     if (window.location.hostname === 'localhost') {
    //     url = 'http://localhost:8080/post';
    //     } else {
    //     url = 'https://pacific-citadel-02863.herokuapp.com/post';
    //     }

    //     fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: userData.username,
    //             imageData: base64Data,
    //             postDesc: postDesc,
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8'
    //         }
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 return response.text().then(errorMessage => {
    //                     throw new Error(errorMessage);
    //                 });
    //             } else {
    //                 return response.json();
    //             }
    //         })
    //         .then(data => {
    //             // Code to execute after successful fetch response
    //             console.log("Working");
    //             localStorage.setItem('currentPage', 1);
    //             window.location.reload();
    //             setCurrentPage(1);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    function sendPostData(base64Data){
        const postDesc = document.getElementById('postDesc').value
        let url;
        if (window.location.hostname === 'localhost') {
        url = 'http://localhost:8080/post';
        } else {
        url = 'https://pacific-citadel-02863.herokuapp.com/post';
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                username: userData.username,
                imageData: base64Data,
                postDesc: postDesc,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                } else {
                    return response.json();
                }
            })
            .then(data => {
                // Code to execute after successful fetch response
                console.log("Working");
                console.log(data);
                localStorage.setItem('currentPage', 1);
                window.location.reload();
                setCurrentPage(1);
            })
            .catch(error => {
                console.log(error);
            });
    }
      
        
    // }
    // function sendPostData(base64Data) {
    //     const postDesc = document.getElementById('postDesc').value;
    //     const url = window.location.hostname === 'localhost'
    //       ? 'http://localhost:8080/post'
    //       : 'https://pacific-citadel-02863.herokuapp.com/post';
      
    //     const fileInput = document.getElementById('fileInput');
    //     const file = fileInput.files[0];
      
    //     if (!file) {
    //       console.log('No file selected');
    //       return;
    //     }
      
    //     const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size (adjust as needed)
    //     const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    //     const promises = [];
      
    //     for (let i = 0; i < totalChunks; i++) {
    //       const start = i * CHUNK_SIZE;
    //       const end = Math.min(start + CHUNK_SIZE, file.size);
    //       const chunk = file.slice(start, end);
      
    //       const formData = new FormData();
    //       formData.append('file', chunk);
    //       formData.append('chunkIndex', i);
    //       formData.append('totalChunks', totalChunks);
    //       formData.append('username', userData.username);
    //       formData.append('postDesc', postDesc);
      
    //       const config = {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       };
      
    //       const promise = axios.post(url, formData, config);
    //       promises.push(promise);
    //     }
      
    //     Promise.all(promises)
    //       .then(responses => {
    //         // Handle responses
    //         console.log('Chunks sent successfully:', responses);
    //         // Code to execute after successful chunked upload
    //       })
    //       .catch(error => {
    //         console.log('Error sending chunks:', error);
    //       });
    //   }


    const handleImageSubmission = (file, imageData) => {
        handleImage(file, imageData);
    };
    
    const handleImage = (file, imageData) => {
        const base64Data = imageData;
        setImageData({ file, base64Data });
    };








    return(
        // Purpose of this page is to add post to user account and also
        <div className="w-full min-h-screen mt-5">
            <h1 className="text-dark-text text-2xl text-center">Create Post</h1>
            <div  className=" p-4 m-5">
                <ImageHandler onImageSubmit={handleImageSubmission}/>
            </div>

            <div className=" p-4 m-5 border text-center rounded flex flex-wrap justify-center">
                <p className='text-dark-text w-full'>Now Lets add a Post Description!</p>
                <textarea name="postDesc" id="postDesc" cols="30" rows="10" className='h-20 min-h-fit mt-3'></textarea>
            </div>
            <button onClick={handlePost} className='px-4 py-2 bg-dark-accent-1 rounded float-right me-5'>Post</button>
        </div>
    )
}

export default AddPost;