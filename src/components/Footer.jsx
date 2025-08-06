import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

function Footer() {
  // COLOR CHANGE: Updated link classes for a light background
  const footerLinkClasses = "text-gray-600 hover:text-blue-600 transition-colors";

  return (
    // COLOR CHANGE: Swapped dark background for white and set default text to dark gray
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto py-12 px-6">
        {/* TOP SECTION: Logo on the left, essential links on the right */}
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Logo and Brand Info */}
          <div className="max-w-sm">
            {/* COLOR CHANGE: Updated logo text to be dark */}
            <Link to="/" className="text-3xl font-bold text-gray-900 tracking-tight">
              TalentForge<span className="text-blue-600">.</span>
            </Link>
            <p className="mt-4 text-sm">
              Connecting businesses with top-tier freelance talent from around the world.
            </p>
          </div>

          {/* Link Sections */}
          <div className="flex gap-16">
            {/* Categories Section */}
            <div className="flex flex-col gap-4">
              {/* COLOR CHANGE: Updated heading color to be dark */}
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h3>
              <Link to="/gigs?cat=graphics-design" className={footerLinkClasses}>Graphics & Design</Link>
              <Link to="/gigs?cat=digital-marketing" className={footerLinkClasses}>Digital Marketing</Link>
              <Link to="/gigs?cat=writing-translation" className={footerLinkClasses}>Writing & Translation</Link>
              <Link to="/gigs?cat=programming-tech" className={footerLinkClasses}>Programming & Tech</Link>
            </div>

            {/* Support Section */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Support</h3>
              <Link to="/support" className={footerLinkClasses}>Help & Support</Link>
              <Link to="/trust" className={footerLinkClasses}>Trust & Safety</Link>
              <Link to="/terms" className={footerLinkClasses}>Terms of Service</Link>
              <Link to="/privacy" className={footerLinkClasses}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* COLOR CHANGE: Updated border color for a light background */}
        <hr className="my-8 border-gray-200" />

        {/* BOTTOM SECTION: Copyright and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright Line */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TalentForge Inc. All rights reserved.
          </p>
          
          {/* Instagram and LinkedIn Links */}
          <div className="flex items-center gap-5">
            {/* COLOR CHANGE: Updated icon color for a light background */}
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Instagram size={24} />
            </Link>
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;