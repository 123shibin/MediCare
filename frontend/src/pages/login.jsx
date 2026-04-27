import { useState } from "react";
import "../styles/auth.css";
import { useLogin, useRegister } from "../hooks/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      loginMutation.mutate(
        {
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess: () => {
            alert("Login successful ✅");
            navigate("/dashboard");
          },
          onError: () => {
            alert("Login failed ❌");
          },
        }
      );
    } else {
      if (formData.password !== formData.confirmPassword) {
        return alert("Passwords do not match ❌");
      }

      registerMutation.mutate(
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        {
          onSuccess: () => {
            alert("Registration successful ✅");
            setIsLogin(true);
          },
          onError: () => {
            alert("Registration failed ❌");
          },
        }
      );
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">

      {/* 🔥 LEFT TEXT CONTENT */}
      <div className="auth-image-content">
        <h2 className="auth-image-title">
          Compassionate Care, Advanced Technology
        </h2>
        <p className="auth-image-subtitle">
          Join our platform connecting healthcare providers and patients for better outcomes.
        </p>
      </div>

      {/* 🔥 RIGHT FORM */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">

          {/* <div className="auth-header">
            <h1 className="auth-title">MediCare Platform</h1>
            <p className="auth-description">
              {isLogin
                ? "Welcome back. Sign in to continue."
                : "Create your account to get started."}
            </p>
          </div> */}

          <form onSubmit={handleSubmit} className="auth-form">

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="auth-toggle">
            <p className="toggle-text">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-button"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}