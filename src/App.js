import React, { useEffect } from 'react';
import './App.css';

import Header from './Components/Header';
import Feed from './Components/Feed';
import SignUp from './Components/SignUp';
import UserNav from './Components/UserNav'
import AuthContext from './Components/AuthContext';
import Profile from './Components/Profile';
import AddPost from './Components/AddPost';
import Settings from './Components/Settings';


function App() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);
  
  useEffect(() => {
    // Check for user authentication on page refresh
    const userToken = localStorage.getItem('sessionId');
    if (userToken) {
      // User is authenticated
      setIsAuthenticated(true);
      // console.log(localStorage.getItem('userData'))
    } else {
      // User is not authenticated
      setIsAuthenticated(false);
    }
  },[]);

  return (
    <div className='dark:bg-dark-background min-h-screen'>
      <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser,setCurrentPage }}>


        <Header/>
        {/* FEED */}
        {/* Feed is only available when User has selected that button. */}
        {/* User should only be able to interact when isAuthenticated. */}
        {/* When User is !isAuthenticated, feed will show random of users that are either trending or show public profile. */}
        {/* When User isAuthenticated, feed will firstly For you page. This prevents users that have no followers from having no content to watch */}
        {currentPage === 0 && <Feed  user={localStorage.getItem('userData')}/>}
        {currentPage === 1 && <Profile />}
        {currentPage === 2 && <AddPost/>}
        {currentPage === 3 && <Settings/>}



        {/* Renders different Navbar depending if the user is authenticated or not */}
        {!isAuthenticated &&<SignUp/>}
        {isAuthenticated &&<UserNav/>}
        
      </AuthContext.Provider>
    </div>
    
  );
}

export default App;
