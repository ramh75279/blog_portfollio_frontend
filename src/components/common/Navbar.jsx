import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../config/firebase';
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const [log, setlog] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setlog(true);
      } else {
        setlog(false);
      }
    });
  }, []);

  function logout() {
  signOut(auth).then(() => {
    navigate("/login"); // 🔥 go to login page
  });
}

  return (
    <div className='py-4 px-8 mt-4 mb-2 flex justify-between items-center bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-white sticky top-4 z-50'>
      <h2 className='text-2xl font-bold'>Peer Project Hub</h2>

      <div className='flex items-center gap-8'>
        <Link className='list-none px-5' to={"/home"}>Home</Link>
        <Link className='list-none px-5' to={"/projects"}>Projects</Link>
        <Link className='list-none px-5' to={"/about"}>About</Link>
        <Link to="/contact">Contact</Link>

        {
          log
            ? <button onClick={logout} className='button-style hidden md:block'>Logout</button>
            : <button className='button-style hidden md:block' onClick={() => navigate("/login")}>Login</button>
        }
      </div>
    </div>
  );
}

export default Navbar;