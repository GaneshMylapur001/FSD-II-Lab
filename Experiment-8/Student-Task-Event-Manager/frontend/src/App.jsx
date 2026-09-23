import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('loading');
  const [typedText, setTypedText] = useState('');

  const infoText = 'Manage tasks. Discover events. Stay organized.';

  // Loading screen → Information screen
  useEffect(() => {
    if (screen !== 'loading') return;

    const timer = setTimeout(() => {
      setScreen('info');
    }, 2500);

    return () => clearTimeout(timer);
  }, [screen]);

  // Typing animation
  useEffect(() => {
    if (screen !== 'info') return;

    let index = 0;

    const typingTimer = setInterval(() => {
      setTypedText(infoText.slice(0, index + 1));
      index++;

      if (index >= infoText.length) {
        clearInterval(typingTimer);
      }
    }, 50);

    return () => clearInterval(typingTimer);
  }, [screen]);

  // Information screen → Login after 5 seconds
  useEffect(() => {
    if (screen !== 'info') return;

    const timer = setTimeout(() => {
      setScreen('login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [screen]);

  // Skip button
  const skipInfo = () => {
    setScreen('login');
  };

  // Loading Screen
  if (screen === 'loading') {
    return (
      <div className="loading-screen">
        <div className="app-name">
          <span className="student">STUDENT</span>
          <span className="hub">HUB</span>
        </div>
      </div>
    );
  }

  // Information Screen
  if (screen === 'info') {
    return (
      <div className="info-screen">
        <div className="info-text">
          {typedText}
        </div>

        <button className="skip-button" onClick={skipInfo}>
          SKIP
        </button>
      </div>
    );
  }

  // Login Screen
  return (
    <div className="login-screen">
      <div className="login-box">

        <h1>LOGIN</h1>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Password"
        />

        <button className="login-button">
          LOGIN
        </button>

        <p>
          Don't have an account?{' '}
          <span>Create Account</span>
        </p>

      </div>
    </div>
  );
}

export default App;