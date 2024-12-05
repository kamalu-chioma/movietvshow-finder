"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Valid usernames and password
  const validUsers = ['Chioma', 'Rukshan', 'Cecil', 'User', 'Pelumi'];
  const validPassword = 'pass';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validUsers.includes(username) && password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      router.push('/');
    } else {
      setErrorMessage('Invalid username or password.');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        maxWidth: '400px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        required
      />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
    </form>
  );
};

export default Login;
