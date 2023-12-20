import React, { useState, useEffect } from "react";
import { useObserver } from "../../hooks/lazy-load/useObserver";

let startTimestamp = null;
export default function CounterOnScroll({ progress = 90, duration = 1000,color='primary' }) {
    const [state, setState] = useState({
        start: 0,
        end: progress,
        duration: (progress / 100) * duration,
        current: 0,
    });

    const { ref, inView } = useObserver();

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
        console.log(inView)
        if(!inView) return
        window.requestAnimationFrame(step);
    }, [inView]);

    return (
        <div className={`counter-on-scroll text-${color}`} ref={ref}>
            <h2 className="display-2">{state.current}%</h2>
            {/* <div className={`progress-bar bg-${color}`} style={{ width: state.current + "%" }}>
                <span className="count">{state.current}%</span>
            </div> */}
        </div>
    );
}
