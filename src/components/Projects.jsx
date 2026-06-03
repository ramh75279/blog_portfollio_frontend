import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaEnvelope } from 'react-icons/fa';

// ==========================================
// 🚀 ADD OR EDIT YOUR PROJECTS HERE!
// Just add a new object to this list to display it:
// ==========================================
const PROJECTS_LIST = [
  {
    title: "Udemy Project",
    subtitle: "Udemy Clone Website",
    description: "A responsive Udemy clone built using HTML and CSS with navbar, categories, and course cards.",
    tags: ["HTML", "CSS", "UI"],
    liveDemoLink: "https://ramh75279.github.io/udemy-clone/",
    githubLink: "https://github.com/ramh75279/udemy-clone"
  },
  {
    title: "Nostra Project",
    subtitle: "Nostra E-commerce Website",
    description: "A fashion e-commerce website built using HTML, CSS, and JavaScript. Includes collections, contact page, and modern UI design.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveDemoLink: "https://ramh75279.github.io/Nostra/",
    githubLink: "https://github.com/ramh75279/Nostra"
  },
];

function Projects() {
  return (
    <div className="py-10 md:py-16 w-full px-2 sm:px-4">
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-14 tracking-tight">
        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Projects</span> 🚀
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {PROJECTS_LIST.map((project, index) => (
          <div 
            key={index} 
            className="bg-white/80 backdrop-blur-sm border border-white/40 shadow-lg hover:shadow-xl rounded-2xl p-5 sm:p-6 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-orange-500 mb-2">
                {project.title}
              </h3>

              {project.subtitle && (
                <h4 className="text-lg font-semibold text-gray-800 mb-3">
                  {project.subtitle}
                </h4>
              )}

              <p className="text-gray-600 text-sm sm:text-base mb-5 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="bg-orange-50 text-orange-600 text-xs sm:text-sm px-3 py-1 rounded-lg font-medium border border-orange-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {project.liveDemoLink && (
                  <a
                    href={project.liveDemoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-orange-500 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl font-semibold shadow-md hover:bg-orange-600 active:scale-95 transition-all duration-200"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 border border-gray-300 text-gray-700 text-xs sm:text-sm px-4 py-2.5 rounded-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all duration-200"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                )}

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-blue-500 text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl font-semibold shadow-md hover:bg-blue-600 active:scale-95 transition-all duration-200"
                >
                  <FaEnvelope />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;