import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../config/api';
import CommentThread from './CommentThread';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    githubLink: '',
    liveDemoLink: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(apiUrl('/api/projects'));
      setProjects(res.data);

      const newCommentsMap = {};
      for (const project of res.data) {
        try {
          const commentRes = await axios.get(
            apiUrl(`/api/projects/${project._id}/comments`)
          );
          newCommentsMap[project._id] = commentRes.data;
        } catch {
          newCommentsMap[project._id] = [];
        }
      }

      setCommentsMap(newCommentsMap);
    } catch (error) {
      console.log('Error fetching projects', error);
    }
  };

  const fetchComments = (projectId) => {
    axios
      .get(apiUrl(`/api/projects/${projectId}/comments`))
      .then((res) => {
        setCommentsMap((prev) => ({
          ...prev,
          [projectId]: res.data
        }));
      })
      .catch(() => {
        console.log('Error fetching comments');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      githubLink: '',
      liveDemoLink: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '')
    };

    try {
      if (editingId) {
        await axios.put(apiUrl(`/api/projects/${editingId}`), payload);
      } else {
        const res = await axios.post(apiUrl('/api/projects'), payload);
        console.log('Saved project:', res.data);
      }

      clearForm();
      await fetchProjects();

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 300);
    } catch (err) {
      console.log('Error saving project:', err);
      console.log('Response data:', err.response?.data);
      console.log('Status:', err.response?.status);
      alert('Project not saved');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags.join(', '),
      githubLink: project.githubLink,
      liveDemoLink: project.liveDemoLink
    });
    setShowAddForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    axios
      .delete(apiUrl(`/api/projects/${id}`))
      .then(() => {
        fetchProjects();
      })
      .catch(() => {
        console.log('Error deleting project');
      });
  };

  const handleCommentInputChange = (projectId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [projectId]: value
    }));
  };

  const handleAddComment = async (projectId, userEmail) => {
    const commentText = commentInputs[projectId]?.trim();

    if (!userEmail) {
      alert('Please enter your email to comment');
      return;
    }

    if (!commentText) {
      alert('Please enter a comment');
      return;
    }

    try {
      await axios.post(apiUrl(`/api/projects/${projectId}/comments`), {
        userEmail,
        commentText
      });
      setCommentInputs((prev) => ({
        ...prev,
        [projectId]: ''
      }));
      fetchComments(projectId);
    } catch (err) {
      console.log('Error adding comment', err);
      alert('Could not post comment');
      throw err;
    }
  };

  const handleUpdateComment = async (projectId, commentId, commentText, userEmail) => {
    if (!userEmail) {
      alert('Please enter your email');
      throw new Error('no email');
    }
    try {
      await axios.put(
        apiUrl(`/api/projects/${projectId}/comments/${commentId}`),
        { userEmail, commentText }
      );
      fetchComments(projectId);
    } catch (err) {
      if (err.response?.status === 403) {
        alert('You can only edit comments with the matching email');
      } else {
        alert('Could not update comment');
      }
      throw err;
    }
  };

  const handleDeleteComment = async (projectId, commentId, userEmail) => {
    if (!userEmail) {
      alert('Please enter your email');
      throw new Error('no email');
    }
    try {
      await axios.delete(
        apiUrl(`/api/projects/${projectId}/comments/${commentId}`),
        { data: { userEmail } }
      );
      fetchComments(projectId);
    } catch (err) {
      if (err.response?.status === 403) {
        alert('You can only delete comments with the matching email');
      } else {
        alert('Could not delete comment');
      }
      throw err;
    }
  };

  const normGh = (url) =>
    (url || '')
      .trim()
      .toLowerCase()
      .replace(/^http:/, 'https:')
      .replace(/\/$/, '');

  const udemyProject = projects.find(
    (p) => normGh(p.githubLink) === normGh('https://github.com/ramh75279/udemy-clone')
  );
  const nostraProject = projects.find(
    (p) => normGh(p.githubLink) === normGh('https://github.com/ramh75279/Nostra')
  );

  const hideFeaturedFromMainList =
    !showAddForm && udemyProject && nostraProject;

  const projectsForMainList = hideFeaturedFromMainList
    ? projects.filter(
        (p) =>
          normGh(p.githubLink) !== normGh('https://github.com/ramh75279/udemy-clone') &&
          normGh(p.githubLink) !== normGh('https://github.com/ramh75279/Nostra')
      )
    : projects;

  return (
    <div className="py-14 w-full">
      <h2 className="text-center text-5xl font-bold mb-14">
        Latest <span className="text-orange-400">Projects</span> 🚀
      </h2>

      {!showAddForm && (
        <>
          <div className="flex justify-center mb-10">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 font-bold shadow-md transition-all duration-300 transform hover:scale-105"
            >
              + Add New Project
            </button>
          </div>

          <div className="mb-10 flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[70%]">

              <h3 className="text-2xl font-bold text-orange-500 mb-2">
                Udemy Project
              </h3>

              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Udemy Clone Website
              </h4>

              <p className="text-gray-600 mb-4">
                A responsive Udemy clone built using HTML and CSS with navbar,
                categories, and course cards.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">HTML</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">CSS</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">UI</span>
              </div>

              <div className="flex gap-4 mb-6">
                <a
                  href="https://ramh75279.github.io/udemy-clone/"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Live Demo
                </a>

                <a
                  href="https://github.com/ramh75279/udemy-clone"
                  target="_blank"
                  rel="noreferrer"
                  className="border px-4 py-2 rounded"
                >
                  GitHub
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Email Me
                </a>
              </div>

              <CommentThread
                projectId={udemyProject?._id || ''}
                comments={udemyProject ? commentsMap[udemyProject._id] || [] : []}
                isLoggedIn={true}
                commentDraft={udemyProject ? commentInputs[udemyProject._id] || '' : ''}
                onCommentDraftChange={(v) =>
                  udemyProject && handleCommentInputChange(udemyProject._id, v)
                }
                onAddComment={(email) => udemyProject && handleAddComment(udemyProject._id, email)}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                missingProject={!udemyProject}
              />
            </div>
          </div>

          <div className="mb-10 flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[70%]">

              {/* Title */}
              <h3 className="text-2xl font-bold text-orange-600 mb-2">
                Nostra Project
              </h3>

              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                Nostra E-commerce Website
              </h4>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                A fashion e-commerce website built using HTML, CSS, and JavaScript.
                Includes collections, contact page, and modern UI design.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">HTML</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">CSS</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded">JavaScript</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-6">
                <a
                  href="https://ramh75279.github.io/Nostra/"   // your Nostra page
                  target="_blank"
                  rel="noreferrer"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Live Demo
                </a>

                <a
                  href="https://github.com/ramh75279/Nostra"
                  target="_blank"
                  rel="noreferrer"
                  className="border px-4 py-2 rounded"
                >
                  GitHub
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Email Me
                </a>
              </div>

              <CommentThread
                projectId={nostraProject?._id || ''}
                comments={nostraProject ? commentsMap[nostraProject._id] || [] : []}
                isLoggedIn={true}
                commentDraft={nostraProject ? commentInputs[nostraProject._id] || '' : ''}
                onCommentDraftChange={(v) =>
                  nostraProject && handleCommentInputChange(nostraProject._id, v)
                }
                onAddComment={(email) => nostraProject && handleAddComment(nostraProject._id, email)}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                missingProject={!nostraProject}
              />

            </div>
          </div>
        </>
      )}

      {showAddForm && (
        <div className="mb-10" style={{ width: '80%', margin: 'auto' }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="font-semibold text-2xl text-gray-800 mb-2 border-b pb-2">
              {editingId ? 'Edit Project Details' : 'Enter New Project Details'}
            </h3>
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border rounded"
              rows="4"
              required
            />

            <input
              type="text"
              name="tags"
              placeholder="Tags (example: React, Node, MongoDB)"
              value={formData.tags}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />

            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Repository Link"
              value={formData.githubLink}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />

            <input
              type="text"
              name="liveDemoLink"
              placeholder="Live Demo Link (optional)"
              value={formData.liveDemoLink}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600 font-semibold w-1/2"
              >
                {editingId ? 'Update Project' : 'Add Project'}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 font-semibold w-1/2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}





      <div className="pb-14">
        {projectsForMainList.map((project) => (
          <div key={project._id} className="mb-10 flex justify-center">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full md:w-[70%]">
              
              <h3 className="text-2xl font-bold text-orange-500 mb-2">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-600 px-3 py-1 rounded"
                  >
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
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    Live Demo
                  </a>
                )}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-50"
                >
                  GitHub
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Email Me
                </a>
              </div>

              <div className="flex gap-4 mb-6 pt-4 border-t">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>

              <CommentThread
                projectId={project._id}
                comments={commentsMap[project._id] || []}
                isLoggedIn={true}
                commentDraft={commentInputs[project._id] || ''}
                onCommentDraftChange={(v) => handleCommentInputChange(project._id, v)}
                onAddComment={(email) => handleAddComment(project._id, email)}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
                missingProject={false}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Projects;