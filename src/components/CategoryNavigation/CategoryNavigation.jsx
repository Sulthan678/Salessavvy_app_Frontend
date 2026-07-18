// import "./CategoryNavigation.css";
import { motion } from "framer-motion";

function CategoryNavigation({ 
  selectedCategory,
  onCategoryClick 
}) {

  const categories = [
    "Shirts",
    "Pants",
    "Accessories",
    "Mobiles",
    "Mobile Accessories"
  ];

  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="sticky top-[76px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-7 px-8 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
          <motion.button
            key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onCategoryClick(category)}
              className={`
                  whitespace-nowrap
                  rounded-full
                  px-6
                  py-2
                  text-sm
                  font-medium
                  border
                  transition-all
                  duration-300

      ${
        selectedCategory === category
            ? "bg-indigo-600 text-white border-indigo-600 shadow-lg"
            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
      }
        `}>
        {category}
        </motion.button>
          ))}
      </div>
      </div>
    </motion.div>
  );
}

export default CategoryNavigation;