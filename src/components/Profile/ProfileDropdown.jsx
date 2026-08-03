import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  LogOut,
  ChevronDown,
} from "lucide-react";

function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const goToOrders = () => {
    navigate("/orders");
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-indigo-300 hover:shadow-md"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
          <User
            size={18}
            className="text-indigo-600"
          />
        </div>

        <span className="hidden text-sm font-medium text-gray-700 md:block">
          {username}
        </span>

        <ChevronDown
          size={8}
          className={`transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.98,
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-62 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="border-b px-5 py-3">
              <p className="text-sm text-gray-500">
                Signed in as
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {username}
              </p>
            </div>

            <div className="py-1">
              {username !== "Admin" && (
                <button
                  onClick={goToOrders}
                  className="flex w-full items-center gap-3 px-5 py-3 text-left transition hover:bg-indigo-50"
                >
                  <Package size={18} />
                  My Orders
                </button>
              )}

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-5 py-3 text-left text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileDropdown;