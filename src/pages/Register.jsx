import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import upload from "../utils/upload";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  // State to hold the specific error message for the user
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // --- IMPROVEMENT 1: Handle optional image upload ---
      // Only upload if a file is selected.
      const url = file ? await upload(file) : "";

      // --- IMPROVEMENT 2: The entire async logic is now in the try block ---
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });

      // On success, navigate to the login page or home page
      navigate("/login"); // Or navigate("/")
      
    } catch (err) {
      // --- IMPROVEMENT 3: Proper error and loading state handling ---
      console.error("Registration Failed:", err);
      // Set a user-friendly error message from the server's response if available
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      // Ensure loading is set to false whether it succeeds or fails.
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10 bg-gray-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 lg:flex-row">
          {/* Left Column */}
          <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-2xl font-bold text-gray-700">Create a new account</h1>
            
            {/* Username, Email, Password, Profile Pic, Country Inputs... (No changes needed here) */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
              <input id="username" name="username" type="text" placeholder="johndoe" onChange={handleChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
              <input id="email" name="email" type="email" placeholder="email@example.com" onChange={handleChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
              <input id="password" name="password" type="password" onChange={handleChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-600">Profile Picture</label>
              <input id="file" type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full p-2 mt-1 text-sm text-gray-500 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-600">Country</label>
              <input id="country" name="country" type="text" placeholder="India" onChange={handleChange} required className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button type="submit" disabled={loading} className="w-full px-4 py-3 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed">
              {loading ? "Registering..." : "Register"}
            </button>
            {/* Display the error message to the user */}
            {error && <span className="text-sm text-red-600 text-center">{error}</span>}
          </div>

          {/* Right Column */}
          <div className="flex flex-col flex-1 gap-4">
            <h1 className="text-2xl font-bold text-gray-700">I want to become a seller</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-600">Activate the seller account</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" onChange={handleSeller} className="sr-only peer"/>
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* --- IMPROVEMENT 4: Conditionally render seller fields --- */}
            {user.isSeller && (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone Number</label>
                  <input id="phone" name="phone" type="text" placeholder="+91 123 456 7890" onChange={handleChange} className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                  <label htmlFor="desc" className="block text-sm font-medium text-gray-600">Description</label>
                  <textarea id="desc" name="desc" placeholder="A short description of yourself" onChange={handleChange} rows="8" className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;