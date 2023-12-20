import React, { useState, useEffect, useRef } from "react";
import { Button } from "..";
import localData from "../../localData";

let isButtonDisabled = false; // preventing double click glitch
let isFirstRender = true; // preventing accordion item short height glitch
function AccordionItem({ buttonName, content, isOpened, index, setActiveIndex, variant, color }) {
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
                    className={`accordion-button  ${isOpened ? "collapsed" : ""}`}
                    variant={variant}
                    color={color}
                    onClick={() => {
                        if (isButtonDisabled === true) return;
                        isButtonDisabled = true;
                        setActiveIndex(!isOpened ? index : null);
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
                <div className="accordion-body" ref={contentRef} onTransitionEnd={(e) => e.stopPropagation()}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default function ControlledAccordion({ items = [], active = null }) {
    const [activeIndex, setActiveIndex] = useState(active);

    return (
        <div className="accordion">
            {!items.length
                ? "empty"
                : items.map((item, index) => {
                      const isOpened = activeIndex === index;
                      return (
                          <AccordionItem
                              key={index}
                              {...{ ...item, isOpened, index, setActiveIndex }}
                          />
                      );
                  })}
        </div>
    );
}
