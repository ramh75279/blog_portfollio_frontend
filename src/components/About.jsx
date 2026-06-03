import React from "react";

function About() {
  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg">

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-orange-500 mb-6">
          About
        </h1>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-8 mb-6">
          A passionate individual focused on building modern web applications 
          with clean design and efficient functionality. Strong interest in 
          creating user-friendly interfaces and solving real-world problems 
          through software development.
        </p>

        {/* Skills */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Skills
        </h2>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>HTML, CSS, JavaScript</li>
          <li>React (Frontend Development)</li>
          <li>Node.js (Backend Development)</li>
          <li>MongoDB and MySQL</li>
        </ul>

        {/* Focus */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Focus
        </h2>
        <p className="text-gray-600 mb-6">
          Focused on writing clean, maintainable code and continuously improving 
          technical skills while exploring new tools and technologies.
        </p>

        {/* Goal */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Goal
        </h2>
        <p className="text-gray-600">
          The objective is to grow as a software developer and contribute to 
          building scalable and impactful applications.
        </p>

      </div>
    </div>
  );
}

export default About;