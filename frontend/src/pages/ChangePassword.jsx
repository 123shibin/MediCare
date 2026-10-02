import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { useChangePassword } from "../hooks/authApi"; 

export default function ChangePassword() {
  const navigate = useNavigate();
  const changePasswordMutation = useChangePassword();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
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
    if (formData.newPassword !== formData.confirmPassword) {
      return setError("Passwords do not match ❌");
    }

    changePasswordMutation.mutate(
      {
        newPassword: formData.newPassword,
      },
      {
        onSuccess: () => {
          alert("Password changed successfully ✅");
          navigate("/change-password");
        },
        onError: (error) => {
          alert.error("Password change failed:", error);
          setError(
            error.response?.data?.message ||
            "Failed to change password. Please try again."
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
          For your security, please create a new password before
          accessing the MediCare platform.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">

          <h2 className="auth-form-title">
            Change Password
          </h2>

          <p className="auth-form-subtitle">
            Your temporary password must be replaced with a new password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >

            {/* NEW PASSWORD */}
            <div className="form-group">
              <label className="form-label">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter new password"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="form-group">
              <label className="form-label">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm new password"
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
              disabled={loading}
            >
              {loading? "Changing Password...": "Change Password"}
            </button>

          </form>

        </div>
      </div>

    </div>
  );
}