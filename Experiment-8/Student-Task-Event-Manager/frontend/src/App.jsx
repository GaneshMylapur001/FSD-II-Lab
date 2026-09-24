import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('loading');
  const [typedText, setTypedText] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const infoText = 'Manage tasks. Discover events. Stay organized.';

  useEffect(() => {
    if (screen !== 'loading') return;

    const timer = setTimeout(() => {
      setScreen('info');
    }, 2500);

    return () => clearTimeout(timer);
  }, [screen]);

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

  useEffect(() => {
    if (screen !== 'info') return;

    const timer = setTimeout(() => {
      setScreen('login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [screen]);

  const skipInfo = () => {
    setScreen('login');
  };

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    alert('Account created successfully!');

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    setScreen('login');
  };

  const handleLogin = () => {
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setScreen('login');
  };

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

  if (screen === 'register') {
    return (
      <div className="login-screen">
        <div className="login-box">
          <h1>CREATE ACCOUNT</h1>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="login-button" onClick={handleRegister}>
            CREATE ACCOUNT
          </button>

          <p>
            Already have an account?{' '}
            <span onClick={() => setScreen('login')}>
              Login
            </span>
          </p>
        </div>
      </div>
    );
  }

  if (screen === 'dashboard') {
    return (
      <div className="dashboard-screen">
        <div className="dashboard-header">
          <div className="dashboard-logo">
            STUDENT <span>HUB</span>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            LOGOUT
          </button>
        </div>

        <div className="dashboard-content">
          <h1>Welcome to Student Hub</h1>

          <p>
            Manage your tasks, discover events, and stay organized.
          </p>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h2>Tasks</h2>
              <p>Manage your daily tasks and track your progress.</p>
              <button>VIEW TASKS</button>
            </div>

            <div className="dashboard-card">
              <h2>Events</h2>
              <p>Discover upcoming college events.</p>
              <button>VIEW EVENTS</button>
            </div>

            <div className="dashboard-card">
              <h2>Profile</h2>
              <p>View and manage your account details.</p>
              <button>VIEW PROFILE</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-screen">
      <div className="login-box">
        <h1>LOGIN</h1>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="login-button" onClick={handleLogin}>
          LOGIN
        </button>

        <p>
          Don't have an account?{' '}
          <span onClick={() => setScreen('register')}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default App;