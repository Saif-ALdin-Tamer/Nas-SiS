import { useState } from 'react';
import { Link } from 'react-router';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock sending email
    setIsSubmitted(true);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container card">
        <div className="forgot-password-header">
          <div className="forgot-password-logo">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 3L2 9L14 15L26 9L14 3Z" fill="#6C63FF" />
              <path d="M5 11V19C5 19 9 23 14 23C19 23 23 19 23 19V11" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M26 9V17" stroke="#6C63FF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h2>NAS</h2>
          </div>
          
          {!isSubmitted ? (
            <>
              <h3>Reset Password</h3>
              <p className="forgot-password-subtitle">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </>
          ) : (
            <>
              <h3>Check your email</h3>
              <p className="forgot-password-subtitle">
                We have sent a password reset link to <strong>{email}</strong>
              </p>
            </>
          )}
        </div>

        {!isSubmitted ? (
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary forgot-password-btn">
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="forgot-password-actions">
             <button onClick={() => setIsSubmitted(false)} className="btn btn-outline resend-btn">
               Resend Email
             </button>
          </div>
        )}

        <div className="forgot-password-footer">
          <Link to="/login" className="back-to-login">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
