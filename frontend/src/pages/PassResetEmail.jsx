import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useResetPassword } from "../hooks/authApi"; 

export default function PassResetEmail() {
  const navigate = useNavigate();
  const resetPasswordMutation = useResetPassword();

  const [formData, setFormData] = useState({email: ""});
  

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPasswordMutation.mutate(
      {
        email: formData.email
      },
      {
        onSuccess: () => {
          alert("Password reset link sent successfully ✅");
          navigate("/login");
        },
        onError: (error) => {
          setError(
            error.response?.data?.message ||
            "Failed to send reset link. Please try again."
          );
        }
      }
    );
  };

  return (
    <div className="auth-container">

      {/* LEFT CONTENT */}
      <div className="auth-image-content">
        <h2 className="auth-image-title">
          Secure Your Account
        </h2>

        <p className="auth-image-subtitle">
          Enter your email to reset password. A password reset link will be sent to your email address. Please check your inbox and follow the instructions to reset your password.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* EMAIL ADDRESS */}
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


            {/* ERROR */}
            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="submit-button"
            >
              Send Reset Link
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}
