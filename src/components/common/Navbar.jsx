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
        <Link className='list-none px-5' to="/contact">Contact</Link>
        <a 
          href="/CV.pdf" 
          download="Hariram-CV.pdf"
          className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300 ml-2"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}

export default Navbar;