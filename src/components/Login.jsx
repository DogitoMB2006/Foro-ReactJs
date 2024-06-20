import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/forums');
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <label className="label">Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <label className="label">Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;
