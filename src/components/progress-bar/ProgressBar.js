import React, { useState, useEffect } from "react";

let startTimestamp = null;
export default function ProgressBar({ progress = 90, duration = 1000,color='primary' }) {
    const [state, setState] = useState({
        start: 0,
        end: progress,
        duration: (progress / 100) * duration,
        current: 0,
    });

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const _progress = Math.min((timestamp - startTimestamp) / state.duration, 1);
        const current = Math.floor(_progress * (state.end - state.start) + state.start);
        setState({
            ...state,
            current,
        });
        if (_progress < 1) window.requestAnimationFrame(step);
    };

    useEffect(() => {
        window.requestAnimationFrame(step);
    }, []);

    return (
        <div className="progress">
            <div className={`progress-bar bg-${color}`} style={{ width: state.current + "%" }}>
                <span className="count">{state.current}%</span>
            </div>
        </div>
    );
}
