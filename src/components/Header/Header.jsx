import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import WishlistIcon from "../Wishlist/WishlistIcon";
// import "./Header.css";
import CartIcon from "../Cart/CartIcon";
import ProfileDropdown from "../Profile/ProfileDropdown";

function Header({
  cartCount,
  username,
  onSearch,
  onSuggestion,
  suggestions
}) {

  const [keyword, setKeyword] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

 const handleSearch = () => {
  if (!keyword.trim()) return;
  onSearch(keyword);
  setKeyword("");
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target)
    ) {
      setKeyword("");
      onSuggestion("");
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [onSuggestion]);

//==========================

  return (
  <motion.header 
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
        duration: 0.5,
        ease: "easeOut"
    }}
  className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-0">

      {/* Logo */}
      <motion.div
          onClick={() => navigate("/customerhome")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="cursor-pointer flex items-center justify-center">
        <img
            src={logo}
            alt="SalesSavvy Logo"
            className="h-21 w-auto"
        />
      </motion.div>

      {/* Search */}
      {onSearch && (
        <motion.div 
          ref={searchRef}
        className="relative w-full max-w-lg mx-10">
          <Search
            whileHover={{scale:1.1}}
            
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => {
              const value = e.target.value;
              setKeyword(value);
              onSuggestion(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-5 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
          {keyword.length > 0 && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-gray-200 bg-white shadow-lg z-50">

            {suggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setKeyword(item);
                  onSearch(item);
                  setKeyword("");
                  }}
                className={`cursor-pointer px-4 py-3 hover:bg-indigo-50 ${index === 0 ? "rounded-t-xl" : ""} 
                ${index === suggestions.length - 1 ? "rounded-b-xl" : ""}`}              
                >
                {item}
              </div>
            ))}

          </div>
        )}
        </motion.div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {username !== "Admin" && (
          <>
          <WishlistIcon />
          <CartIcon count={cartCount} />
          </>
        )}

        <ProfileDropdown username={username} />

      </div>

    </div>
  </motion.header>
);
}
export default Header;