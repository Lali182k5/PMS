import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './sign.css'; // Make sure this file exists

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);

    // Validate password: at least 6 chars, 1 capital letter, 1 number
    const isValidPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(val);
    setIsValid(isValidPassword);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!isValid) {
      alert('Password must have at least 6 characters, 1 capital letter, and 1 number.');
      return;
    }

    const user = { email, name, mobile, password };
    localStorage.setItem(email, JSON.stringify(user));
    alert("✅ Signup successful. Please login.");
    navigate('/');
  };

  return (
    <div className="signup-wrapper">
      <div className="auth-container">
        <h2>📝 Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {!isValid && (
            <p className="password-warning">
              ⚠️ Password must be at least 6 characters, with one capital letter and one number.
            </p>
          )}

          <button type="submit">Signup</button>
        </form>

        <div className="bottom-links">
          <p>Already have an account? <Link to="/">Login</Link></p>
          <Link className="forgot" to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
