// src/pages/Home.jsx

import React from "react";
import Featured from "../components/Featured";
import Slide from "../components/Slide";
import CatCard from "../components/CatCard";
import { Link } from "react-router-dom";
import { cards } from "../data"; // Assuming your category card data is here
import { Check } from "lucide-react";



function Home() {
  return (
    <div>
      <Featured />

      {/* CATEGORY SLIDER SECTION */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Browse by Category
        </h2>
        <Slide>
          {cards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </Slide>
      </div>
      
      {/* FEATURES SECTION (LIGHT THEME) */}
      <div className="flex justify-center bg-blue-50 py-20 px-6">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="font-extrabold text-4xl text-gray-800 leading-tight">
              A World of Talent at Your Fingertips
            </h2>
            
            <div className="space-y-4 text-lg text-gray-600">
                <div className="flex items-start gap-3">
                    <Check className="w-7 h-7 text-blue-600 mt-1 flex-shrink-0" />
                    <p><span className="font-bold">The Best for Every Budget:</span> Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
                </div>
                <div className="flex items-start gap-3">
                    <Check className="w-7 h-7 text-blue-600 mt-1 flex-shrink-0" />
                    <p><span className="font-bold">Protected Payments, Every Time:</span> You always know what you'll pay upfront. Your payment isn't released until you approve the work.</p>
                </div>
                <div className="flex items-start gap-3">
                    <Check className="w-7 h-7 text-blue-600 mt-1 flex-shrink-0" />
                    <p><span className="font-bold">24/7 Support:</span> Our round-the-clock support team is available to help anytime, anywhere.</p>
                </div>
            </div>

            <Link to="/gigs">
              <button className="w-max bg-blue-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors mt-4">
                Explore Talent
              </button>
            </Link>
          </div>
          <div className="flex-1 w-full">
            <video src="./img/video.mp4" controls className="w-full h-auto object-cover rounded-lg shadow-xl" />
          </div>
        </div>
      </div>

{/* TALENTFORGE BUSINESS SECTION (REDESIGNED) */}
<div className="flex justify-center bg-slate-900 text-white py-20 px-6 overflow-hidden">
  <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16">
    {/* Left Column: Text Content */}
    <div className="flex-1 flex flex-col gap-6 text-center lg:text-left">
      <div className="flex items-center gap-3 justify-center lg:justify-start">
        <h2 className="text-3xl font-bold tracking-tight">TalentForge</h2>
        <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full uppercase">Business</span>
      </div>
      <h3 className="font-extrabold text-4xl leading-tight">
        A Powerful Workspace to Supercharge Your Team
      </h3>
      <p className="text-lg text-slate-300">
        Upgrade to a curated experience with advanced tools and dedicated support, built for business.
      </p>
      <div className="space-y-4 text-lg text-slate-200 mt-2">
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 mt-1 text-blue-400 flex-shrink-0" />
          <span>**Vetted, Elite Talent:** Access freelancers with proven business experience.</span>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 mt-1 text-blue-400 flex-shrink-0" />
          <span>**Dedicated Support:** Get matched with the perfect talent by a success manager.</span>
        </div>
        <div className="flex items-start gap-3">
          <Check className="w-6 h-6 mt-1 text-blue-400 flex-shrink-0" />
          <span>**Collaborative Tools:** Manage teamwork and boost productivity in one workspace.</span>
        </div>
      </div>
      <Link to="/gigs">
        <button className="w-max bg-blue-500 text-white font-semibold py-3 px-8 rounded-md hover:bg-blue-600 transition-colors mt-4">
          Explore Business Solutions
        </button>
      </Link>
    </div>
    {/* Right Column: New Image */}
    <div className="flex-1 w-full">
      <img 
        src="./img/business.png" 
        alt="TalentForge Business Dashboard" 
        className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl shadow-blue-900/40"
      />
    </div>
  </div>
</div>      
    </div>
  );
}

export default Home;