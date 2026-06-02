import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='py-4 px-8 mt-4 mb-2 flex justify-between items-center bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-white sticky top-4 z-50'>
      <h2 className='text-2xl font-bold'>Portfollio</h2>

      <div className='flex items-center gap-8'>
        <Link className='list-none px-5' to={"/home"}>Home</Link>
        <Link className='list-none px-5' to={"/projects"}>Projects</Link>
        <Link className='list-none px-5' to={"/about"}>About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
}

export default Navbar;