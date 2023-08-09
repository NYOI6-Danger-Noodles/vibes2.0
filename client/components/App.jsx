import React, { useState } from 'react';
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
        <Route
          path="/user"
          element={
            isLoggedIn ? (
              <UserPage username={username} />
            ) : (
              <Navigate to="/login-signup" replace />
            )
          }
        />
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
