import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (password !== confirm) return setError('Passwords do not match');
        if (password.length < 6) return setError('Password must be at least 6 characters');
        try {
            const res = await fetch(`${API}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) return setError(data.message || 'Registration failed');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } catch {
            setError('Cannot reach server. Is the backend running on port 3000?');
        }
    }

    return (
        <main className="auth-container">
            <div className="auth-card">
                <h2>Create Your Account</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
                    </div>
                    {error && <small style={{ color: '#dc2626' }}>{error}</small>}
                    <button type="submit" className="btn-submit">Sign Up</button>
                </form>
                <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </main>
    );
}
