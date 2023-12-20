import React, { useState, useEffect, useRef } from "react";

export default function MultiRangeSlider({ leftProgress = 25, rightProgress = 75 }) {
    const [leftInputValue, setLeftInputValue] = useState(leftProgress);
    const [rightInputValue, setRightInputValue] = useState(rightProgress);
    const [leftPercent, setLeftPercent] = useState(leftProgress + "%");
    const [rightPercent, setRightPercent] = useState(100 - rightProgress + "%");

    const leftInput = useRef(null);
    const rightInput = useRef(null);
    const leftThumb = useRef(null);
    const rightThumb = useRef(null);

    const getPercent = (primaryInput, secondaryInput, isLeftInput) => {
        const [min, max] = [parseInt(primaryInput.min), parseInt(primaryInput.max)];
        const value = Math[isLeftInput ? "min" : "max"](
            parseInt(primaryInput.value),
            parseInt(secondaryInput.value) - (isLeftInput ? +10 : -10)
        );
        const percent = ((value - min) / (max - min)) * 100;
        return { value, percent };
    };

    const setLeftValue = () => {
        const { value, percent } = getPercent(leftInput.current, rightInput.current, true);
        setLeftPercent(percent + "%");
        setLeftInputValue(value);
    };

    const setRightValue = () => {
        const { value, percent } = getPercent(rightInput.current, leftInput.current, false);
        setRightPercent(100 - percent + "%");
        setRightInputValue(value);
    };

    return (
        <div className="multi-range-slider" style={{ marginBottom: "3rem" }}>
            <input
                ref={leftInput}
                type="range"
                className="input-left"
                min="0"
                max="100"
                value={leftInputValue}
                onInput={setLeftValue}
            />
            <input
                ref={rightInput}
                type="range"
                className="input-right"
                min="0"
                max="100"
                value={rightInputValue}
                onInput={setRightValue}
            />

            <div className="slider">
                <div className="track"></div>
                <div className="range" style={{ left: leftPercent, right: rightPercent }}></div>
                <div className="thumb left" ref={leftThumb} style={{ left: leftPercent }}></div>
                <div className="thumb right" ref={rightThumb} style={{ right: rightPercent }}></div>
            </div>
            <div className="counts-group">
                <b className="left-count">{leftInputValue}</b>
                <b className="right-count">{rightInputValue}</b>
            </div>
        </div>
    );
}
