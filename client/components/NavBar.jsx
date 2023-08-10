import React from 'react';
import { useState } from 'react';
// import { Navbar, Button, Form, Dropdown, Badge, Input } from 'react-daisyui';

const NavBar = () => {
  return (
    <div className="navbar bg-gradient-to-r from-cyan-500 to-blue-500 mb-5">
      <div className="flex-1">
        <a
          href="/user"
          className="font-Caprasimo italic text-white btn btn-ghost normal-case text-4xl"
        >
          Vibe 2.0
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu text-white menu-horizontal px-1 text-2xl ">
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/user">Saved</a>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.imgur.com/pstXZah.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/login-signup">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
