export default function ProgressBar({ percent }) {
    return (
        <section className="progress-section">
            <h2>Overall Progress</h2>
            <div className="progress-bar">
                {percent >= 15
                    ? <div className="progress-fill" style={{ width: `${percent}%` }}>{percent}%</div>
                    : <div className="progress-fill" style={{ width: `${percent}%` }} />}
            </div>
            <small>{percent}% of tasks completed</small>
        </section>
    );
}
