import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../services/authService";

// import "../styles/Register.css";

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
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          SalesSavvy
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back! Sign in to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Username */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
          />

          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username}
            </p>
          )}

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}

        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Sign In
        </button>

      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        New user?{" "}
        <Link
          to="/register"
          className="font-semibold text-indigo-600 hover:underline"
        >
          Create an account
        </Link>
      </p>

    </div>

  </div>
);
}

export default Login;