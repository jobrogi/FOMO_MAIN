import React, {useEffect, useState} from "react";
import AuthContext from './AuthContext';

function SignUp(){

    const { setIsAuthenticated, setUser } = React.useContext(AuthContext);
    const {setCurrentPage} = React.useContext(AuthContext);
    

    const [active, setActive] = useState(1);
    
    function setActiveContent(){
        if(active == 1){
            setActive(0);
        }
        if(active == 0){
            setActive(1);
        }
    }

    const[popUpActive,setPopUp] = useState(0);

    function SetPopUp(e){
        setFormSection(0);

        if(e.target.value == "Close"){
            setPopUp(0);

        }
        if(e.target.value == "SignIn"){
            setPopUp(1);

        }
        if(e.target.value == "SignUp"){
            setPopUp(2);

        }
    }

    const[formSection,setFormSection] = useState(0);
    
    function SetFormSection(e){
        if(e.target.value == "Close"){
            setFormSection(0);

        }

        if(e.target.value == "Next"){
            setFormSection(formSection + 1);
        }
        if(e.target.value == "Back"){
            setFormSection(formSection - 1);
        }
    }

    const[errMessage,setErrMessage] = useState("");

    function handleSignUp(e) {
        e.preventDefault();
      
        var fName = document.getElementById('fName').value;
        var lName = document.getElementById('lName').value;
        var email = document.getElementById('email').value;
        var dob = document.getElementById('dob').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
      
        const year = dob.slice(0, 4);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        console.log(fName)
      
        if (year >= currentYear - 13) {
          console.log('Under 13');
        } else {
          let url;
          if (window.location.hostname === 'localhost') {
            url = 'http://localhost:8080/signUp';
          } else {
            url = 'https://shielded-scrubland-55438.herokuapp.com/signUp';
          }
      
          fetch(url, {
            method: 'POST',
            body: JSON.stringify({ fName, lName, email, dob, username, password }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8'
            }
          })
            .then(response => {
              if (!response.ok) {
                return response.text().then(errorMessage => {
                  setErrMessage(errorMessage);
                  throw new Error(errorMessage);
                });
              } else {
                return response.json();
              }
            })
            .then(data => {
              setErrMessage("Success! Welcome " + data.user.fName);
      
              const userData = {
                fName: data.user[0].fName,
                lName: data.user[0].lName,
                email: data.user[0].email,
                username: data.user[0].username
              };
      
              localStorage.setItem('sessionId', data.sessionId);
              localStorage.setItem('userData', JSON.stringify(userData));
      
              console.log(localStorage.getItem('userData'));
              setIsAuthenticated(true);
              setUser(userData);
              setCurrentPage(1);
              setPopUp(0);
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
      

    function handleLogIn(e) {
        e.preventDefault();
      
        const username = document.getElementById('_username').value;
        const password = document.getElementById('_password').value;
      
        let url;
          if (window.location.hostname === 'localhost') {
            url = 'http://localhost:8080/signUp';
          } else {
            url = 'https://shielded-scrubland-55438.herokuapp.com/signUp';
          }
      
        fetch(url, {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then(response => {
            if (!response.ok) {
              return response.text().then(errorMessage => {
                setErrMessage(errorMessage);
                throw new Error(errorMessage);
              });
            } else {
              return response.json();
            }
          })
          .then(data => {
            setErrMessage("Success! Welcome " + data.user[0].fName);
      
            const userData = {
              fName: data.user[0].fName,
              lName: data.user[0].lName,
              email: data.user[0].email,
              username: data.user[0].username
            };
      
            localStorage.setItem('sessionId', data.sessionId);
            localStorage.setItem('userData', JSON.stringify(userData));
      
            console.log(localStorage.getItem('userData'));
            setIsAuthenticated(true);
            setUser(userData);
            setCurrentPage(1);
            setPopUp(0);
          })
          .catch(error => {
            console.log('CATCH ERROR @ SIGN IN ' + error);
          });
      }
      

    
    return(
        <div className="min-h-full w-full bottom-0 absolute">

            {/* Custom error message system */}
            <div className={errMessage === ""? "hidden": "w-full flex justify-center fixed top-0"}>
                <div className=" mt-3 text-center min-w-fit bg-gray-500 p-3 rounded-lg text-white flex">
                    <h1>{errMessage}</h1>
                    <button className="ps-5" onClick={() => setErrMessage("")}>X</button>
                </div>
            </div>

            <div className={active== 1 ? "flex flex-wrap bg-black w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200" : "flex flex-wrap bg-gradient-to-b from-transparent to-gray-900 w-full fixed bottom-0 px-4 pb-4 pt-1 transition-all duration-200 translate-y-12"}>
                <div className="text-white text-center w-full mb-1" >
                    {active == 1? <button aria-label="Sign Up Button" onClick={setActiveContent}><i className="fa-solid fa-angle-down"></i></button> : <button onClick={setActiveContent}><i className="fa-solid fa-angle-up"></i></button> }
                </div>
                <div className={active == 1 ? "flex justify-center items-baseline w-full" : "flex justify-center w-full"}>
                    <div className="sm:flex flex flex-nowrap w-full justify-center">
                        <button className="text-dark-text h-fit outline-none bg-dark-accent-1  rounded-lg p-1 sm:px-12" data-modal-show="modalID" value={"SignUp"} onClick={SetPopUp}>Sign Up</button>
                        <button className="text-dark-text h-fit outline-none bg-dark-accent-1  rounded-lg p-1 ms-2 sm:px-12" data-modal-show="modalID" value={"SignIn"} onClick={SetPopUp}>Sign In</button>
                    </div>
                </div>
            </div>

            <div className={popUpActive === 0? "hidden" : "fixed pointer-events-none w-full h-full inset-0 bg-transparent overflow-y-auto"} id="my-modal">

                <div className="w-full h-fit bg-gradient-to-tr from-black to-gray-900 left-0 top-32  absolute shadow-2xl sm:w-2/4 sm:left-1/4">\
                    <button className=" w-8 h-8 text-white float-right m-2 pointer-events-auto" value={"Close"} onClick={SetPopUp}>X</button>

                    <div className="flex w-full h-full justify-center p-4">
                        {popUpActive == 2?
                            <div className="text-white text-center w-full -mt-6">
                                <form method="POST" id="SignUp" className={formSection == 0? "w-full h-fit pointer-events-auto": "hidden"}>
                                    <p className="p-2 text-2xl">Sign Up 1/2</p>
                                    <hr />
                                    <p className="p-4 mb-2">No Information will be shown or shared publicly. Your information is only used for security purposes.</p>

                                    <div className="border-2 flex flex-wrap justify-center p-2">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">First and Last Name</h1>
                                        <div className="flex flex-nowrap w-full">
                                            <input type="text" id="fName" className="p-3 mb-2 m-1 w-1/2 outline-none text-black" placeholder="First Name" />
                                            <input type="text" id='lName' className="p-3 mb-2 m-1 w-1/2 outline-none text-black" placeholder="Last Name" />
                                        </div>
                                    </div>

                                    <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Email</h1>
                                        <input type="email" id='email' className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Email Address" />
                                    </div>

                                    <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Date of Birth</h1>
                                        <input type="date" id="dob" className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Email Address" />
                                    </div>
                                    <button type="button" value={"Next"} onClick={SetFormSection} className="w-full bg-dark-accent-1  p-2 mt-2 rounded-lg">Next</button>
                                </form>

                                <div action="POST" form="SignUp" className={formSection == 1? "w-full h-fit pointer-events-auto": "hidden"}>
                                    <p className="p-2 text-2xl">Sign Up 2/2</p>
                                    <hr />

                                    <p className="mt-2 mb-1 text-center font-bold">Username & Password Tips</p>
                                    <ul className="p-2">
                                        <li>Avoid sensitive personal info.</li>
                                        <li>Do not include profanity in your username.</li>
                                        <li>Simple to remember but difficult to guess. </li>
                                        <li>Use a longer password and include numbers and special characters.</li>
                                    </ul>
                                    <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Username</h1>
                                        <input form="SignUp" type="text" id='username' className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Enter Username" />
                                    </div>

                                    <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Password</h1>
                                        <input form="SignUp" type="password" id='password' className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Enter Password" />
                                        {/* <input form="SignUp" type="text" className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Re Enter Password" /> */}
                                    </div>

                                    <div className="flex flex-nowrap">
                                        <button type="button" value={"Back"} onClick={SetFormSection} className="w-1/2 bg-dark-accent-1 p-2 mt-2 m-2 rounded-lg">Back</button>
                                        <button form="SignUp" type="submit" onClick={handleSignUp} className="w-1/2 bg-dark-accent-1  p-2 mt-2 m-2 rounded-lg">Submit</button>
                                    </div>
                                    
                                </div>


                            </div>:
                            
                            <div className="text-white text-center w-full -mt-6 flex flex-wrap justify-center">
                                <div className="flex w-full justify-center -mt-4 mb-4 text-2xl">
                                    Sign In
                                </div>
                                <div className={formSection == 0? "justify-center":"hidden"}>
                                    {/* Sign in with google */}
                                    <form method="POST" id="signIn" className="w-full h-fit pointer-events-auto ">
                                        <div className="border-2 flex flex-wrap justify-center p-2">
                                            <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit"><i className="fa-brands fa-google me-1"></i> Sign in with Google</h1>
                                            <button className="p-3 mb-2 m-1 w-full outline-none bg-white text-black">
                                                <p className="float-left">Sign in as Jonathon</p>
                                                <p className="text-xs float-left text-gray-400">Jobrogi@gmail.com</p>
                                            </button>
                                        </div>
                                    </form>

                                    {/* Or */}
                                    <div className="flex w-full justify-center flex-wrap text-white mt-8">
                                        <hr className="w-full"/>
                                        <p className="bg-gradient-to-tr from-black to-gray-900 p-1 -mt-4">or</p>
                                    </div>

                                    {/* Sign in with our data. */}
                                    <form action="POST" id="SignIn" className="w-full h-fit pointer-events-auto ">
                                        <p>Login with Us 1/2</p>
                                        <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                            <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Username</h1>
                                            <input id="_username" type="text" className="p-3 mb-2 m-1 w-full outline-none text-black" placeholder="Email Address" />
                                        </div>

                                        <div className="flex flex-nowrap">
                                            <button form="SignIn" type="button" value={"Next"} onClick={SetFormSection} className="w-full bg-dark-accent-1  p-2 mt-2 m-2 rounded-lg">Next</button>
                                        </div>

                                    </form>
                                </div>
                                <div className={formSection == 1? "": "hidden"}>
                                <p>Login with Us 2/2</p>

                                    <div className="border-2 flex flex-wrap justify-center p-2 mt-4">
                                        <h1 className="bg-gradient-to-tr from-black to-gray-900 px-3 -mt-5 w-fit">Password</h1>
                                        <input id="_password" type="text" className="p-3 mb-2 m-1 w-full outline-none text-black pointer-events-auto" placeholder="Enter Password" />
                                    </div>
                                    <p className="mt-2 text-gray-300">Forgot Password?</p>


                                    <div className="flex flex-nowrap pointer-events-auto">
                                            <button form="SignIn" type="button" value={"Back"} onClick={SetFormSection} className="w-1/2 bg-dark-accent-1  p-2 mt-2 m-2 rounded-lg pointer-events-auto">Back</button>
                                            <button form="SignUp" type="submit" onClick={handleLogIn} className="w-1/2 bg-dark-accent-1  p-2 mt-2 m-2 rounded-lg">Submit</button>
                                    </div>
                                </div>
                                
                            </div> 
                        }
                    </div>

                </div>
            </div>
        </div>
        
    )
}


export default SignUp;