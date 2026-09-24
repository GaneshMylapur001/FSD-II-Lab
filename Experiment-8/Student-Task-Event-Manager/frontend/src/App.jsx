import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [screen, setScreen] = useState('loading');
  const [typedText, setTypedText] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');

  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);

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

  const handleAddTask = () => {
    if (!taskTitle || !taskDescription || !taskDueDate) {
      alert('Please fill in all task fields.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      dueDate: taskDueDate,
      completed: false
    };

    setTasks([...tasks, newTask]);

    setTaskTitle('');
    setTaskDescription('');
    setTaskDueDate('');
  };

  const handleCompleteTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === 'pending') {
      return !task.completed;
    }

    if (taskFilter === 'completed') {
      return task.completed;
    }

    return true;
  });

  const handleAddEvent = () => {
    if (!eventTitle || !eventDescription || !eventDate || !eventVenue) {
      alert('Please fill in all event fields.');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: eventTitle,
      description: eventDescription,
      date: eventDate,
      venue: eventVenue
    };

    setEvents([...events, newEvent]);

    setEventTitle('');
    setEventDescription('');
    setEventDate('');
    setEventVenue('');
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
    setRegisteredEvents(
      registeredEvents.filter((eventId) => eventId !== id)
    );
  };

  const handleRegisterEvent = (id) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(
        registeredEvents.filter((eventId) => eventId !== id)
      );
    } else {
      setRegisteredEvents([...registeredEvents, id]);
    }
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

              <button onClick={() => setScreen('tasks')}>
                VIEW TASKS
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Events</h2>
              <p>Discover upcoming college events.</p>

              <button onClick={() => setScreen('events')}>
                VIEW EVENTS
              </button>
            </div>

            <div className="dashboard-card">
              <h2>Profile</h2>
              <p>View and manage your account details.</p>

              <button>
                VIEW PROFILE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'tasks') {
    return (
      <div className="tasks-screen">
        <div className="tasks-header">
          <div className="dashboard-logo">
            STUDENT <span>HUB</span>
          </div>

          <button
            className="logout-button"
            onClick={() => setScreen('dashboard')}
          >
            DASHBOARD
          </button>
        </div>

        <div className="tasks-content">
          <h1>My Tasks</h1>

          <div className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />

            <textarea
              placeholder="Task description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />

            <input
              type="date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
            />

            <button onClick={handleAddTask}>
              ADD TASK
            </button>
          </div>

          <div className="task-filters">
            <button onClick={() => setTaskFilter('all')}>
              ALL
            </button>

            <button onClick={() => setTaskFilter('pending')}>
              PENDING
            </button>

            <button onClick={() => setTaskFilter('completed')}>
              COMPLETED
            </button>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="no-tasks">
                No tasks available.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  className={`task-card ${
                    task.completed ? 'completed-task' : ''
                  }`}
                  key={task.id}
                >
                  <div>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <small>Due: {task.dueDate}</small>
                  </div>

                  <div className="task-actions">
                    <button
                      onClick={() =>
                        handleCompleteTask(task.id)
                      }
                    >
                      {task.completed ? 'UNDO' : 'COMPLETE'}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteTask(task.id)
                      }
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'events') {
    return (
      <div className="events-screen">
        <div className="events-header">
          <div className="dashboard-logo">
            STUDENT <span>HUB</span>
          </div>

          <button
            className="logout-button"
            onClick={() => setScreen('dashboard')}
          >
            DASHBOARD
          </button>
        </div>

        <div className="events-content">
          <h1>College Events</h1>

          <div className="event-form">
            <input
              type="text"
              placeholder="Event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />

            <textarea
              placeholder="Event description"
              value={eventDescription}
              onChange={(e) =>
                setEventDescription(e.target.value)
              }
            />

            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            <input
              type="text"
              placeholder="Venue"
              value={eventVenue}
              onChange={(e) => setEventVenue(e.target.value)}
            />

            <button onClick={handleAddEvent}>
              ADD EVENT
            </button>
          </div>

          <div className="event-list">
            {events.length === 0 ? (
              <div className="no-events">
                No events available.
              </div>
            ) : (
              events.map((event) => (
                <div className="event-card" key={event.id}>
                  <div>
                    <h2>{event.title}</h2>

                    <p>{event.description}</p>

                    <small>
                      Date: {event.date}
                    </small>

                    <small>
                      Venue: {event.venue}
                    </small>
                  </div>

                  <div className="event-actions">
                    <button
                      onClick={() =>
                        handleRegisterEvent(event.id)
                      }
                    >
                      {registeredEvents.includes(event.id)
                        ? 'REGISTERED'
                        : 'REGISTER'}
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteEvent(event.id)
                      }
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            )}
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

        <input
          type="password"
          placeholder="Password"
        />

        <button
          className="login-button"
          onClick={handleLogin}
        >
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