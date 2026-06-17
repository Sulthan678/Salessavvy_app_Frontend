import "./CategoryNavigation.css";

function CategoryNavigation({ onCategoryClick }) {

  const categories = [
    "Shirts",
    "Pants",
    "Accessories",
    "Mobiles",
    "Mobile Accessories"
  ];

  return (
    <nav className="category-nav">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className="category-btn"
        >
          {category}
        </button>
      ))}

    </nav>
  );
}

export default CategoryNavigation;