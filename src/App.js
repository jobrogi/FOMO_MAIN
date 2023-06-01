import React, { useEffect } from "react";
import "./App.css";

import Header from "./Components/Header";
import Feed from "./Components/Profile/Feed";
import BottomNav from "./Components/BottomNav";
import UserNav from "./Components/Profile/UserNav";
import AuthContext from "./Components/AuthContext";
import Profile from "./Components/Profile/Profile";
import AddPost from "./Components/Post/AddPost";
import Settings from "./Components/Profile/Settings";
import UserProfiles from "./Components/UserProfiles";
import ChangeProfile from "./Components/Profile/ChangeProfile";

function App() {
  const storedPage = localStorage.getItem("currentPage");

  const [currentPage, setCurrentPage] = React.useState(
    storedPage ? parseInt(storedPage) : 0
  );

  const [currentRoute, setCurrentRoute] = React.useState({});

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Check for user authentication on page refresh
    const userToken = localStorage.getItem("sessionId");
    if (userToken) {
      // User is authenticated
      setIsAuthenticated(true);
    } else {
      // User is not authenticated
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    // Store the current page in local storage
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <div className="dark:bg-Black min-h-screen w-full ">
      <AuthContext.Provider
        value={{
          isAuthenticated,
          user,
          setIsAuthenticated,
          setUser,
          setCurrentPage,
          setCurrentRoute,
        }}
      >
        <Header />
        {/* Renders different Navbar depending if the user is authenticated or not */}

        {/* FEED */}
        {/* Feed is only available when User has selected that button. */}
        {/* User should only be able to interact when isAuthenticated. */}
        {/* When User is !isAuthenticated, feed will show random of users that are either trending or show public profile. */}
        {/* When User isAuthenticated, feed will firstly For you page. This prevents users that have no followers from having no content to watch */}
        <div className=" w-full h-fit xl:px-96 2xl:px-120">
          {currentPage === 0 && <Feed />}
          {currentPage === 1 && <Profile route="/getUserPosts" />}
          {currentPage === 2 && <AddPost />}
          {currentPage === 3 && <Settings />}
          {currentPage === 4 && <UserProfiles route={currentRoute} />}
          {currentPage === 5 && <ChangeProfile />}
          {isAuthenticated && (
            <UserNav currentRoute={currentRoute} currentPage={currentPage} />
          )}

          {/* Getting rid of: */}
          {/* {!isAuthenticated && <BottomNav />} */}
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
