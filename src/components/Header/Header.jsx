import "./Header.css";
import CartIcon from "../Cart/CartIcon";
import ProfileDropdown from "../Profile/ProfileDropdown";

function Header({ cartCount, username }) {

  return (
    <header className="header">

      <h2 className="logo">SalesSavvy</h2>

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