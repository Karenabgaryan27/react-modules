import React, { useState, useRef, useEffect } from "react";

export default function RangeSlider({ progress = 0, fill = "rgba(25, 118, 210,1)", background = "#d7dcdf" }) {
    const [style, setStyle] = useState({ backgroundImage: "" });
    const [value, setValue] = useState(progress);

    const slider = useRef(null);

    const applyFill = () => {
        const percentage =
            (100 * (slider.current.value - slider.current.min)) / (slider.current.max - slider.current.min);
        const bg = `linear-gradient(90deg, ${fill} ${percentage}%, ${background} ${percentage + 0.1}%)`;
        setStyle({ backgroundImage: bg });
    };

    useEffect(() => {
        applyFill(value);
    }, [value]);

    return (
        <div className="range-slider">
            <input
                ref={slider}
                className="range-slider-range"
                style={style}
                type="range"
                value={value}
                min="0"
                max="100"
                onChange={(e) => setValue(e.target.value)}
            />
            <span className="range-slider-value">{value}</span>
        </div>
    );
}
