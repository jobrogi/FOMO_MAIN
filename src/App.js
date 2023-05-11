import React from 'react';
import './App.css';

import Header from './Components/Header';
import Feed from './Components/Feed';
import SignUp from './Components/SignUp';
import UserNav from './Components/UserNav'
import AuthContext from './Components/AuthContext';
import Profile from './Components/Profile';


function App() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  return (
    <div className='bg-slate-700 min-h-screen'>
      <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser,setCurrentPage }}>
        <Header/>
        {/* FEED */}
        {/* Feed is only available when User has selected that button. */}
        {/* User should only be able to interact when isAuthenticated. */}
        {/* When User is !isAuthenticated, feed will show random of users that are either trending or show public profile. */}
        {/* When User isAuthenticated, feed will firstly For you page. This prevents users that have no followers from having no content to watch */}
        {currentPage === 0 && <Feed  user={user}/>}
        {currentPage === 1 && <Profile  user={user}/>}


        {/* PROFILE */}
        {/*  */}





        {!isAuthenticated &&<SignUp/>}
        {isAuthenticated &&<UserNav/>}
        
      </AuthContext.Provider>
    </div>
    
  );
}

export default App;
