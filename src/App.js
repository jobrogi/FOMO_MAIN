import React from 'react';
import './App.css';

import Header from './Components/Header';
import Feed from './Components/Feed';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div className='bg-slate-700 min-h-screen'>
      <Header/>
      <Feed/>
      <SignUp/>
    </div>
    
  );
}

export default App;
