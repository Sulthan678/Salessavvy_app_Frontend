import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
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
    <header className="header">

      {onSearch && (
        <div className="search-box">
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
          />
          <button onClick={handleSearch}>
            search
          </button>
        </div>
      )}

        <h2 className="logo" onClick={() => navigate("/customerhome")}>
            SalesSavvy
        </h2> 

       <div className="header-right">

       
          {username !== "Admin" && (
                <CartIcon count={cartCount} />
            )}
      

        <ProfileDropdown username={username} />

      </div>

    </header>
  );
}

export default Header;