import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/gigs?search=${input}`);
  };

  const popularSearches = ["UI/UX Design", "AI Voice-overs", "Video Editor", "SEO Expert"];

  return (
    // Main hero section with a gradient background
    <div className="h-[550px] md:h-[600px] flex justify-center bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800">
      <div className="w-full max-w-7xl flex items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex-1 flex flex-col gap-8"
        >
          {/* New, more professional headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            The Future of Work is Here.
            <br />
            Hire <span className="text-blue-600">Top-Tier Talent</span>, On-Demand.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with a global network of expert freelancers ready to bring your vision to life.
          </p>

          {/* Redesigned search bar */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-full flex items-center justify-between overflow-hidden shadow-lg h-16 w-full max-w-2xl"
          >
            <div className="flex items-center gap-4 w-full pl-6">
              <Search className="text-gray-400" size={24} />
              <input
                type="text"
                placeholder='e.g., "Social Media Manager"'
                onChange={(e) => setInput(e.target.value)}
                className="border-none outline-none w-full text-lg placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              className="w-[130px] h-full border-none bg-blue-600 text-white text-lg font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
            >
              Find
            </button>
          </form>

          {/* Redesigned popular search tags */}
          {/* <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold">Popular:</span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/gigs?search=${tag}`)}
                className="py-1.5 px-4 text-gray-700 border border-gray-300 rounded-full bg-white/50 text-sm hover:bg-gray-100 hover:border-gray-400 transition-all"
              >
                {tag}
              </button>
            ))}
          </div> */}
        </motion.div>

        {/* New hero image display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full hidden lg:flex items-end"
        >
          <img src="./img/hero-3.png" alt="Freelancers collaborating on a project" className="h-[95%] object-contain" />
        </motion.div>
      </div>
    </div>
  );
}

export default Featured;