import React, { useState, useEffect } from "react";

let startTimestamp = null;
export default function CircularProgressBar({ progress = 90, duration = 1000,color='green' }) {
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
        <div className="circular-progress-wrapper">
            <h2 className="circular-progress-count">
                {state.current}%
            </h2>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-1 -1 34 34"
                data-percentage="0.9"
                data-target="#circular-progress-count1"
                className="circular-progress"
            >
                <circle cx="16" cy="16" r="15.9155" className="circular-progress-background" />

                <circle
                    cx="16"
                    cy="16"
                    r="15.9155"
                    className={`circular-progress-bar bg-${color}`}
                    style={{ strokeDashoffset: 100 - state.current }}
                />
            </svg>
        </div>
    );
}
