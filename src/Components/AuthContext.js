import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => {},
  setUser: () => {},
});

export default AuthContext;
