import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <section className="hero">
                <h1>Plan. Track. Succeed.</h1>
                <p>Never miss a deadline again. Track your study hours and visualize your progress.</p>
                <Link to="/register"><button>Get Started</button></Link>
            </section>
            <section className="features">
                <h2>Why Smart Study Planner?</h2>
                <div className="feature-cards">
                    <div className="card"><h3>Task Management</h3><p>Organize all your assignments, exams, and projects in one place.</p></div>
                    <div className="card"><h3>Study Timer</h3><p>Use the Pomodoro technique to study efficiently.</p></div>
                    <div className="card"><h3>Progress Tracking</h3><p>See how much you've completed with visual progress bars.</p></div>
                    <div className="card"><h3>Study Groups</h3><p>Collaborate with classmates and share study plans.</p></div>
                </div>
            </section>
        </>
    );
}
