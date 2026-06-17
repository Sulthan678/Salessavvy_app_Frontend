import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    // Username validation
    if (!/^[a-zA-Z0-9_]{4,16}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 4-16 characters (letters, numbers, underscore only)";
    }

    // Password validation
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must contain 8+ chars, uppercase, lowercase, number & special char";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const response = await loginUser(formData);

    const role = response.data.role;

    if (role === "CUSTOMER") {
      navigate("/customerhome");
    } else if (role === "ADMIN") {
      navigate("/adminhome");
    }

  } catch (error) {
     alert(error.response?.data?.error || "Login failed");
  }

  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}

          {/* Password */}
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit">Sign In</button>
        </form>

        <p className="bottom-text">
          New user?{" "}
          <Link to="/register" className="login-link">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;