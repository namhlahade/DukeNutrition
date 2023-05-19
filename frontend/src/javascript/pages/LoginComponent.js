const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!username || !password) {
      setError('All fields are required.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Send login request to the backend
      const response = await axios.post('/login', { username, password });

      // Handle successful login
      // TODO: Handle JWT token received from backend
      console.log(response.data.message);
    } catch (error) {
      // Handle login error
      setError('Invalid username or password.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
