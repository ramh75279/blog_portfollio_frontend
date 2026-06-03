import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(apiUrl("/api/contact"), {
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      if (res.data.success) {
        alert("✅ Email Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("❌ Email Failed!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error sending email!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-orange-500">
          Contact Me
        </h1>

        <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-xl"
        >
          <div className="space-y-6">
            
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            ></textarea>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 bg-orange-500 text-white font-semibold px-8 py-3 rounded-full transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600'}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://github.com/ramh75279"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-xl hover:text-orange-500 hover:border-orange-500 transition"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/sathalogithasiva-hariram-b01a7639b/"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-xl hover:text-orange-500 hover:border-orange-500 transition"
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ramh75379@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center text-xl hover:text-orange-500 hover:border-orange-500 transition"
          >
            <HiOutlineMail />
          </a>
        </div>
      </div>

    </div>
  );
}

export default Contact;