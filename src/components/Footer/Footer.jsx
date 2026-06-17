import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* Left Section */}
        <div className="footer-left">
          <h3>SalesSavvy</h3>
          <p>Your one-stop shop for all your needs</p>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>© 2023 SalesSavvy. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;