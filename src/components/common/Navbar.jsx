import React, { useState } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className='py-4 px-4 md:px-8 mt-4 mb-2 flex justify-between items-center bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-white sticky top-4 z-50' aria-label="Main Navigation">
        <h2 className='text-2xl font-bold'>Portfollio</h2>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-8'>
          <Link className='list-none px-5 hover:text-orange-500 transition-colors' to={"/home"}>Home</Link>
          <Link className='list-none px-5 hover:text-orange-500 transition-colors' to={"/projects"}>Projects</Link>
          <Link className='list-none px-5 hover:text-orange-500 transition-colors' to={"/about"}>About</Link>
          <Link className='list-none px-5 hover:text-orange-500 transition-colors' to="/contact">Contact</Link>
          <a 
            href="/CV.pdf" 
            download="Hariram-CV.pdf"
            className="bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:bg-orange-600 hover:scale-105 transition-all duration-300 ml-2"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className='md:hidden text-2xl text-gray-800 hover:text-orange-500 focus:outline-none transition-colors duration-300'
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/45 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div 
        className={`fixed top-0 right-0 h-screen w-[75vw] max-w-[320px] bg-white/95 backdrop-blur-lg z-50 p-6 flex flex-col gap-6 shadow-2xl border-l border-white/20 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
          <h2 className='text-2xl font-bold text-gray-800'>Navigation</h2>
          <button 
            onClick={() => setIsOpen(false)} 
            className='text-2xl text-gray-800 hover:text-orange-500 focus:outline-none transition-colors duration-300'
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className='flex flex-col gap-5 mt-4'>
          <Link 
            onClick={() => setIsOpen(false)} 
            className='text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 border-b border-gray-50/50' 
            to={"/home"}
          >
            Home
          </Link>
          <Link 
            onClick={() => setIsOpen(false)} 
            className='text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 border-b border-gray-50/50' 
            to={"/projects"}
          >
            Projects
          </Link>
          <Link 
            onClick={() => setIsOpen(false)} 
            className='text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 border-b border-gray-50/50' 
            to={"/about"}
          >
            About
          </Link>
          <Link 
            onClick={() => setIsOpen(false)} 
            className='text-lg font-semibold text-gray-700 hover:text-orange-500 transition-colors duration-200 py-2 border-b border-gray-50/50' 
            to="/contact"
          >
            Contact
          </Link>
          
          <a 
            href="/CV.pdf" 
            download="Hariram-CV.pdf"
            className="bg-orange-500 text-white text-center px-4 py-3 rounded-xl font-semibold shadow-md hover:bg-orange-600 active:scale-95 transition-all duration-300 mt-6"
            onClick={() => setIsOpen(false)}
          >
            Download CV
          </a>
        </div>
      </div>
    </>
  );
}

export default Navbar;