import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // replaced useHistory with useNavigate as useHistory is deprecated
import { Navigate } from 'react-router-dom';

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
        // updated history.push with navigate
        navigate('/user');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials');
      // console.error(err);
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
      onLogin();
    } catch (err) {
      setError('Signup failed. Username might already be in use.');
      console.error(err);
    }
  };

  return (
    <div className='h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className=' font-Caprasimo italic text-center text-8xl text-white min-w-full py-48 py-auto'>
        VIBE 2.0
      </h1>
      <form className='signup-container'>
        <div className='signup-card'>
          <div className='w-screen flex flex-col gap-y-4 '>
            <input
              type='text'
              className='border border-2 w-1/4 bg-white p-2 mx-auto rounded-full'
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type='password'
              className='border border-2 w-1/4 p-2 bg-white mb-4 mx-auto rounded-full'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className='btn h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 w-1/6 py-2 mx-auto h-5 rounded-full'
              onClick={login}
            >
              Login
            </button>
            <button
              className='btn h-14 bg-gradient-to-r from-purple-500 to-pink-500 w-1/6 py-2 mx-auto h-5 rounded-full'
              onClick={signup}
            >
              Sign Up
            </button>
          </div>
          {error && <p className='errmessage'>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
