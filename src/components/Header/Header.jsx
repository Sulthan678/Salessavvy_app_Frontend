import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
// import "./Header.css";
import CartIcon from "../Cart/CartIcon";
import ProfileDropdown from "../Profile/ProfileDropdown";

function Header({
  cartCount,
  username,
  onSearch
}) {

  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
  if (keyword.trim() === "") {
    return;
  }
  onSearch(keyword);
  setKeyword("");
};

  return (
  <motion.header 
    initial={{ y: -80, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
        duration: 0.5,
        ease: "easeOut"
    }}
  className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

      {/* Logo */}
      <motion.h2
      onClick={() => navigate("/customerhome")}
        whileHover={{scale: 1.05,}}
        whileTap={{scale: 0.97,}}
        className="text-3xl font-bold text-indigo-600 cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        SalesSavvy
      </motion.h2>

      {/* Search */}
      {onSearch && (
        <motion.div className="relative w-full max-w-lg mx-10">
          <Search
            whileHover={{scale:1.01}}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-5 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </motion.div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {username !== "Admin" && (
          <CartIcon count={cartCount} />
        )}

        <ProfileDropdown username={username} />

      </div>

    </div>
  </motion.header>
);
}
export default Header;