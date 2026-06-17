import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Validation Function
  const validate = () => {
    let newErrors = {};

    // Username validation
    if (!/^[a-zA-Z0-9_]{4,16}$/.test(formData.username)) {
      newErrors.username =
        "Username must be 4-16 characters (letters, numbers, underscore only)";
    }

    // Email validation
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format";
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

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role";
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
  } else {

    try {

      const response = await axios.post(
        "http://localhost:9090/api/users/register",
        formData
      );

      alert(response.data.message);

      // redirect to login page
      console.log("Redirecting to login...");
navigate("/login");

    } catch (error) {

  if (error.response) {
    alert(error.response.data.error);
  } else {
    alert("Server not responding");
  }



    }

  }

  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

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

          {/* Email */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

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

          {/* Role */}
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
          {errors.role && <p className="error">{errors.role}</p>}

          <button type="submit">Register</button>
</form>

<p className="bottom-text">
  Already a user?{" "}
  <Link to="/login" className="login-link">
    Log in here
  </Link>
</p>
      </div>
    </div>
  );
}

export default Register;