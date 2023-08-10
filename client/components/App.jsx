import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes, // use Routes instead of Switch
  Route,
  Navigate,
} from 'react-router-dom';
import LoginSignup from './LoginSignup.jsx';
import UserPage from './UserPage.jsx';
import SearchPage from './SearchPage.jsx'; // import the SearchPage

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [verified, setVerified] = useState(false);

  // useEffect(() => {
  //   verifyUser();
  // }, []);

  const verifyUser = async () => {
    const res = await fetch('/api/verifyUser');
    // console.log('hit');
    const bool = await res.json();
    // console.log(bool);
    if (bool === 'true') {
      setIsLoggedIn(true);
      setVerified(true);
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login-signup"
          element={
            !isLoggedIn ? (
              <LoginSignup
                onLogin={() => setIsLoggedIn(true)}
                setUser={(name) => setUsername(name)}
              />
            ) : (
              <Navigate to="/user" replace />
            )
          }
        />
        <Route path="/user" element={<UserPage username={username} />} />
        {/* add the route for SearchPage */}
        <Route
          path="/search"
          element={<SearchPage username={username} />}
        />{' '}
        <Route path="*" element={<Navigate to="/login-signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
