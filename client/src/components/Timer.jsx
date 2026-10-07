import { useState, useEffect, useRef } from 'react';

export default function Timer() {
    const [duration, setDuration] = useState(25);
    const [seconds, setSeconds] = useState(25 * 60);
    const [running, setRunning] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(id);
    }, [running]);

    useEffect(() => {
        if (seconds <= 0) {
            setRunning(false);
            alert('Pomodoro complete! Take a break.');
        }
    }, [seconds]);

    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');

    return (
        <section className="timer-section" ref={ref}>
            <h2>🍅 Pomodoro Timer</h2>
            <p className="timer-display">{m}:{s}</p>
            <div className="timer-config">
                <label>Minutes: </label>
                <input
                    type="number"
                    min="1"
                    max="120"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                />
                {[15, 25, 45, 60].map((p) => (
                    <button key={p} type="button" className="preset-btn" onClick={() => setDuration(p)}>{p}</button>
                ))}
                <button type="button" className="preset-btn" onClick={() => { setSeconds(duration * 60); setRunning(false); }}>Set</button>
            </div>
            <div className="action-buttons">
                <button onClick={() => setRunning(true)}>Start</button>
                <button onClick={() => setRunning(false)}>Pause</button>
                <button onClick={() => { setRunning(false); setSeconds(duration * 60); }}>Reset</button>
            </div>
        </section>
    );
}
