import React from 'react';

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
    <div className="py-14 w-full">
      <h2 className="text-center text-5xl font-bold mb-14">
        Latest <span className="text-orange-400">Projects</span> 🚀
      </h2>

      {PROJECTS_LIST.map((project, index) => (
        <div key={index} className="mb-10 flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[70%]">
            <h3 className="text-2xl font-bold text-orange-500 mb-2">
              {project.title}
            </h3>

            {project.subtitle && (
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {project.subtitle}
              </h4>
            )}

            <p className="text-gray-600 mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="bg-orange-100 text-orange-600 px-3 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mb-6">
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                  Live Demo
                </a>
              )}

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition"
                >
                  GitHub
                </a>
              )}

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Email Me
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Projects;