import React, { useState } from 'react';
import './forgot.css'; // Optional: create this file for styling

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending reset email
    setSubmitted(true);
  };

  return (
    <div className="forgot-container">
      <h2>🔑 Forgot Password</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
      ) : (
        <p className="confirmation">📬 A password reset link has been sent to {email}</p>
      )}
    </div>
  );
}
