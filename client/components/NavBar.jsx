import React from 'react';
import { useState } from 'react';
// import { Navbar, Button, Form, Dropdown, Badge, Input } from 'react-daisyui';

const NavBar = () => {
  return (
    <div className="navbar bg-primary mb-5">
      <div className="flex-1">
        <a href="/user" className="btn btn-ghost normal-case text-xl">
          Vibes 2.0
        </a>
      </div>
      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/user">Places</a>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
