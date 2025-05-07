import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar2 from "./Navbar2";

const url = "http://localhost:8000/Users";

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address.");
      newErrors.email = "Invalid email.";
    }
    if (!formData.password) {
      alert("Please enter a password.");
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const adminCredentials = {
      email: "admin@example.com",
      password: "admin123",
    };

    try {
      const response = await axios.get(url);
      const users = response.data.Users;

      const matchedUser = users.find(
        (user) =>
          user.email === formData.email &&
          user.password === formData.password
      );

      if (!matchedUser) {
        alert("Login Error: Invalid email or password. Please try again.");
        return;
      }

      if (
        formData.email === adminCredentials.email &&
        formData.password === adminCredentials.password
      ) {
        alert("Login successful! Welcome, Admin.");
        navigate("/admin-dashboard");
      } else {
        alert("Login successful! Welcome, " + matchedUser.name);
        navigate("/user-profile", { state: { user: matchedUser } });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        alert("Login Error: Server error. Status: " + error.response.status);
      } else if (error.request) {
        alert("Login Error: No response from server. Please check your connection.");
      } else {
        alert("Login Error: " + error.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="bg-overlay"></div>

      {/* Floating Decorative Squares */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-300 opacity-50 rounded-lg animate-float floating-square"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-indigo-300 opacity-50 rounded-lg animate-float delay-300 floating-square"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-purple-300 opacity-50 rounded-lg animate-float delay-600 floating-square"></div>
      <div className="absolute top-20 right-20 w-14 h-14 bg-green-300 opacity-50 rounded-lg animate-float delay-900 floating-square"></div>
      <div className="absolute bottom-20 left-20 w-18 h-18 bg-yellow-300 opacity-50 rounded-lg animate-float delay-1200 floating-square"></div>

      <Navbar2 />

      <div className="flex items-center justify-center py-16 px-4 mt-10 relative z-10">
        <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fadeIn form-container transform transition-all hover:shadow-4xl duration-500">
          {/* Welcome Message */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 font-montserrat tracking-tight animate-slideIn">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-600 font-opensans mt-2">
              Log in to continue your adventure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-gray-900 font-semibold mb-2 font-roboto">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white placeholder-gray-500 font-roboto shadow-sm focus-ring"
                  placeholder={`Enter your ${key}`}
                />
                {errors[key] && (
                  <p className="text-red-500 text-sm mt-2 animate-fadeIn font-roboto error-shake">
                    {errors[key]}
                  </p>
                )}
              </div>
            ))}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-blue-700 hover:text-blue-900 font-semibold text-sm"
                style={{ textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-2xl hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-103 font-semibold font-poppins shadow-md animate-gradientShift"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-gray-800 mt-6 text-sm font-roboto">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 hover:text-blue-900 font-semibold">
              Sign up
            </Link>
          </p>

          {/* Social Logins */}
          <div className="mt-4 space-y-2">
            <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-103 font-semibold font-poppins shadow-md social-button">
              Login with Google
            </button>
            <button className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 rounded-2xl hover:from-blue-800 hover:to-blue-900 transition-all duration-300 transform hover:scale-103 font-semibold font-poppins shadow-md social-button">
              Login with Facebook
            </button>
          </div>
        </div>
      </div>

      {/* CSS for animations and styling */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&family=Poppins:wght@600;800&family=Roboto:wght@400;600&display=swap');

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
          @keyframes glow {
            0% { transform: scale(1); opacity: 0.15; }
            50% { transform: scale(1.2); opacity: 0.25; }
            100% { transform: scale(1); opacity: 0.15; }
          }
          .animate-glow {
            animation: glow 5s infinite;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          .animate-pulse {
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradientShift {
            background-size: 200% 200%;
            animation: gradientShift 5s ease infinite;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
          .delay-600 {
            animation-delay: 0.6s;
          }
          .delay-900 {
            animation-delay: 0.9s;
          }
          .delay-1200 {
            animation-delay: 1.2s;
          }
          .font-poppins {
            font-family: 'Poppins', sans-serif;
          }
          .font-roboto {
            font-family: 'Roboto', sans-serif;
          }
          .font-montserrat {
            font-family: 'Montserrat', sans-serif;
          }
          .font-opensans {
            font-family: 'Open Sans', sans-serif;
          }
          .shadow-4xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          /* Additional CSS Enhancements */
          .bg-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
            z-index: 0;
          }
          .form-container:hover {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
          }
          input:focus {
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
            border-color: #3b82f6;
          }
          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }
          .social-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            position: relative;
            overflow: hidden;
          }
          .social-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.3s ease;
          }
          .social-button:hover::before {
            left: 0;
          }
          .error-shake {
            animation: shake 0.3s ease;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
          /* Responsive Design */
          @media (max-width: 640px) {
            .form-container {
              padding: 1.5rem;
              max-width: 90%;
            }
            h1 {
              font-size: 2.5rem;
            }
            .floating-square {
              display: none;
            }
          }
          .focus-ring {
            transition: all 0.3s ease;
          }
          .focus-ring:focus {
            ring: 2px solid #3b82f6;
            ring-offset-2;
          }
        `}
      </style>
    </div>
  );
}