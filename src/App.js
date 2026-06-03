import { Fragment } from "react";
import Home from "./components/Home";
import Projects from "./components/Projects";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-moving-image relative min-h-screen text-gray-800 overflow-x-hidden">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-0 pointer-events-none"></div>
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 md:px-10 min-h-0">
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <main className="flex min-h-0 w-full min-w-0 flex-1 flex-col">
                <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
            </Fragment>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;