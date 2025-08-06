import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Briefcase, PlusCircle, LogOut, Send, ShoppingCart } from "lucide-react";

function Navbar() {
  const [active, setActive] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isHomePage = pathname === "/";
  const isScrolled = active || !isHomePage;

  useEffect(() => {
    const handleScroll = () => window.scrollY > 0 ? setActive(true) : setActive(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadUser = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);
  
  useEffect(() => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  
  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-blue-900/95 backdrop-blur-sm text-white shadow-lg"
          : "bg-transparent text-gray-800"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
        <Link to="/" className="text-3xl font-bold tracking-tight">
          TalentForge
          <span className={isScrolled ? "text-blue-400" : "text-blue-600"}>.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-semibold text-base">
          <Link to="/gigs" className={`transition-colors ${isScrolled ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Find Talent</Link>
          {!currentUser?.isSeller && (
            <Link to="/register" className={`transition-colors ${isScrolled ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Become a Seller</Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4 font-semibold">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={currentUser.img || "/img/profile-avatar.png"}
                  alt="User"
                  className={`w-10 h-10 rounded-full object-cover border-2 ${isScrolled ? 'border-blue-700' : 'border-gray-300'}`}
                />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-14 right-0 p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-1 w-52 text-gray-600 shadow-lg"
                  >
                    <div className="px-2 py-1 mb-2">
                        <p className="font-bold text-gray-800">{currentUser.username}</p>
                        <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                    </div>
                    {currentUser.isSeller && (
                      <>
                        <Link className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100" to="/mygigs"><Briefcase size={16} /> My Gigs</Link>
                        <Link className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100" to="/add"><PlusCircle size={16} /> Add New Gig</Link>
                      </>
                    )}
                    <Link className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100" to="/orders"><ShoppingCart size={16} /> Orders</Link>
                    <Link className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100" to="/messages"><Send size={16} /> Messages</Link>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 w-full text-left text-red-500"><LogOut size={16} /> Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className={`transition-colors ${isScrolled ? 'hover:text-blue-300' : 'hover:text-blue-600'}`}>Sign in</Link>
              <Link to="/register">
                <button
                  className={`py-2 px-5 rounded-md font-semibold transition-all duration-300 ${
                    isScrolled
                      ? "text-white border-2 border-white hover:bg-white hover:text-blue-900"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Join
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28}/> : <Menu size={28}/>}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (FIXED SECTION) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute md:hidden top-20 left-0 w-full h-[calc(100vh-80px)] bg-white flex flex-col items-center gap-8 pt-10 text-gray-800 text-2xl font-medium"
          >
            {/* Standard Links */}
            <Link to="/gigs">Find Talent</Link>
            {!currentUser?.isSeller && <Link to="/register">Become a Seller</Link>}
            
            <hr className="w-2/3 my-4 border-gray-200" />
            
            {/* Conditional User Links for Mobile */}
            {currentUser ? (
              <>
                {currentUser.isSeller && (
                  <>
                    <Link to="/mygigs">My Gigs</Link>
                    <Link to="/add">Add New Gig</Link>
                  </>
                )}
                <Link to="/orders">Orders</Link>
                <Link to="/messages">Messages</Link>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link>
                <Link to="/register">
                  <button className="bg-blue-600 text-white py-2 px-6 rounded-md text-xl">
                    Join
                  </button>
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;