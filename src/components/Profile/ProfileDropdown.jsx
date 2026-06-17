import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileDropdown.css";

function ProfileDropdown({ username }) {

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  /* =========================
     NAVIGATION
  ========================= */

  const goToOrders = () => {

    navigate("/orders");

    setIsOpen(false);
  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {

  try {

    const response = await fetch(

      "http://localhost:9090/api/auth/logout",

      {
        method: "POST",

        credentials: "include"
      }
    );



    if (response.ok) {

      console.log(
        "User successfully logged out"
      );

      navigate("/");

    } else {

      console.error(
        "Failed to logout"
      );
    }

  } catch (error) {

    console.error(
      "Error during logout:",
      error
    );
  }
};

  return (

    <div className="profile-dropdown">

      <button
        className="profile-button"
        onClick={toggleDropdown}
      >
        👤 {username || "Guest"}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {/* <button>
            Profile
          </button> */}
           
            {username !== "Admin" && (
                    <button onClick={goToOrders}>
                      Orders
                    </button>
              )}
          

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      )}

    </div>
  );
}

export default ProfileDropdown;