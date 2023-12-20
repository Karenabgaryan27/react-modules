import React, { useState, useRef, useEffect } from "react";
import { Button } from "..";
import localData from "../../localData";

let isButtonDisabled = false; // preventing double click glitch
let isFirstRender = true;  // preventing accordion item short height glitch
function AccordionItem({ buttonName, content, isItemOpened,variant,color }) {
    const [isOpened, setIsOpened] = useState(isItemOpened);
    const [height, setHeight] = useState("0px");
    const [display, setDisplay] = useState("none");
    const { chevronDown } = localData.svgs;
    const contentRef = useRef(null);

    useEffect(() => {
        isOpened ? setDisplay("block") : setHeight("0px");
    }, [isOpened]);

    useEffect(() => {
        if (display === "block") {
            setTimeout(() => setHeight(contentRef.current.offsetHeight + "px"), isFirstRender ? 1000 : 0);
        }
        isFirstRender = false;
    }, [display]);

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <Button
                    className={`accordion-button ${isOpened ? "collapsed" : ""}`}
                    variant={variant}
                    color={color}
                    onClick={() => {
                        if (isButtonDisabled === true) return;
                        isButtonDisabled = true;
                        setIsOpened(!isOpened);
                    }}
                    endIcon={chevronDown}
                >
                    {buttonName}
                </Button>
            </h2>
            <div
                className={`accordion-collapse collapse ${isOpened ? "show" : ""}`}
                style={{ display, height }}
                onTransitionEnd={() => {
                    isButtonDisabled = false;
                    if (!isOpened) setDisplay("none");
                }}
            >
                <div className="accordion-body" ref={contentRef}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default function Accordion({ items = [], active = null }) {
    return (
        <div className="accordion">
            {!items.length
                ? "empty"
                : items.map((item, index) => {
                      const isItemOpened = active === index;
                      return <AccordionItem key={index} {...{ ...item, isItemOpened }} />;
                  })}
        </div>
    );
}
