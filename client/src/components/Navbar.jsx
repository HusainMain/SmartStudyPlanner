import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '../api';

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav>
            <div className="logo">StudyPlanner</div>
            <ul className="nav-links">
                {getToken() ? (
                    <>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
