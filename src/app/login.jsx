import { useState } from 'react';
import '../styles/auth.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      {/* Image Section */}
      <div className="auth-image-section">
        <img
          src="https://images.unsplash.com/photo-1765896387387-0538bc9f997e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZSUyMGVsZGVybHklMjBwYXRpZW50JTIwc3RhbmRpbmclMjBzbWlsaW5nJTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NzYwNzY5MzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Caregiver and patient standing together happily"
          className="auth-image"
        />
        <div className="auth-image-overlay" />
        <div className="auth-image-content">
          <h2 className="auth-image-title">
            Compassionate Care, Advanced Technology
          </h2>
          <p className="auth-image-subtitle">
            Join our platform connecting healthcare providers and patients for better outcomes.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <h1 className="auth-title">MediCare Platform</h1>
            <p className="auth-description">
              {isLogin ? 'Welcome back. Sign in to continue.' : 'Create your account to get started.'}
            </p>
          </div>

          <form
            key={isLogin ? 'login' : 'signup'}
            onSubmit={handleSubmit}
            className="auth-form"
          >
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" className="checkbox" />
                  Remember me
                </label>
                <button type="button" className="forgot-password">
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="submit-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="auth-toggle">
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="toggle-button"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {!isLogin && (
            <p className="terms-text">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
