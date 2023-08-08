import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // replaced useHistory with useNavigate as useHistory is deprecated

const LoginSignup = ({ onLogin, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // replaced history with navigate

  const login = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    try {
      const response = await axios.post('api/login', { username, password });
      if (response.status === 200) {
        onLogin();
        setUser(username);
        navigate('/user'); // updated history.push with navigate
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
      console.error(err);
    }
  };

  const signup = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('All fields required');
      return;
    }

    try {
      await axios.post('api/signup', { username, password });
      setError('Signup successful. Please login.');
    } catch (err) {
      setError('Signup failed. Username might already be in use.');
      console.error(err);
    }
  };

  return (
    <div className="coolGradient">
      <h1 className="text-5xl w-min mx-auto mt-48 mb-5">VIBE</h1>
      <form className="signup-container">
        <div className="signup-card">
          <div className="w-screen flex flex-col gap-y-4 ">
            <input
              type="text"
              className="border border-4 w-1/2 bg-white p-2 mx-auto rounded-full"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              className="border border-4 w-1/2 p-2 bg-white mx-auto rounded-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="btn btn-primary w-1/4 py-2 mx-auto"
              onClick={login}
            >
              Login
            </button>
            <button
              className="btn btn-primary w-1/4 py-2 mx-auto"
              onClick={signup}
            >
              Sign Up
            </button>
          </div>
          {error && <p className="errmessage">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
