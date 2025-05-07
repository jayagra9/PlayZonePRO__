import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";

const url = "http://localhost:8000/Users";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.age.trim()) {
      newErrors.age = "Age range is required.";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
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

    try {
      const res = await axios.post(url, formData);
      console.log("User registered successful");
      navigate("/login", { state: { user: res.data } });
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 relative overflow-hidden">
      <Navbar2 />
      <div className="flex items-center justify-center py-16 px-4 mt-10">
        <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:shadow-4xl duration-500">
          {/* Onboarding Section (Left) */}
          <div className="md:w-1/2 p-10 bg-gradient-to-br from-blue-700 to-indigo-700 text-white relative">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-80 h-80 bg-blue-400 opacity-15 rounded-full filter blur-4xl animate-glow"></div>
              <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400 opacity-15 rounded-full filter blur-4xl animate-glow delay-1200"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-5 animate-slideIn font-montserrat tracking-tight">
                Welcome to PlayZone!!
              </h2>
              <p className="text-lg mb-8 animate-slideIn delay-300 font-opensans leading-relaxed">
                Discover exciting packages, explore fun-filled events, and book your adventure today!
              </p>
            </div>
            {/* SVG Wave Pattern */}
            <svg
              className="absolute bottom-0 left-0 w-full h-28"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path
                fill="rgba(255, 255, 255, 0.25)"
                fillOpacity="1"
                d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,128C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>

          {/* Sign-Up Form Section (Right) */}
          <div className="md:w-1/2 p-10">
            <h2 className="text-3xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 font-montserrat tracking-tight">
              Join Us Today
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <label className="block text-gray-900 font-semibold mb-2 font-roboto">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  {key === "gender" ? (
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white font-roboto shadow-sm"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : key === "age" ? (
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white font-roboto shadow-sm"
                    >
                      <option value="">Select age range</option>
                      <option value="1-12">Child (1-12 years)</option>
                      <option value="13-19">Teenager (13-19 years)</option>
                      <option value="20-29">Young Adult (20-29 years)</option>
                      <option value="30-49">Adult (30-49 years)</option>
                      <option value="50+">Senior (50+ years)</option>
                    </select>
                  ) : (
                    <input
                      type={
                        key === "password"
                          ? "password"
                          : key === "phone"
                          ? "tel"
                          : "text"
                      }
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full px-5 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition bg-gray-50 hover:bg-white placeholder-gray-500 font-roboto shadow-sm"
                      placeholder={`Enter your ${key}`}
                    />
                  )}
                  {errors[key] && (
                    <p className="text-red-500 text-sm mt-2 animate-fadeIn font-roboto">
                      {errors[key]}
                    </p>
                  )}
                </div>
              ))}
              <button
                onClick={validateForm}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-2xl hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-103 font-semibold font-poppins shadow-md"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-gray-800 mt-6 text-sm font-roboto">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-700 hover:text-blue-900 font-semibold"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Updated CSS for animations and styling */}
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
          .delay-1200 {
            animation-delay: 1.2s;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.6s ease-out;
          }
          .delay-300 {
            animation-delay: 0.3s;
          }
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
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
          @media (max-width: 768px) {
            .md\\:flex-row {
              flex-direction: column;
            }
            .md\\:w-1\\/2 {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}