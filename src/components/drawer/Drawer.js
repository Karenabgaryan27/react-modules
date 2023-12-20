import React, { useState, useEffect } from "react";
import { Button } from "../";
import localData from "../../localData";
import useLock from "../../hooks/useLock";

export default function Drawer({
    className = "drawer-left",
    content = "",
    toggler = null,
    children = null,
    Component = null,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [display, setDisplay] = useState("none");
    const { close } = localData.svgs;

    useEffect(() => {
        if (display === "block") setIsOpen(true);
    }, [display]);

    const { lockScroll, unlockScroll } = useLock();

    useEffect(() => {
        isOpen ? lockScroll() : unlockScroll();
    }, [isOpen]);

    const callbackFromParent = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className={`drawer-toggler ${isOpen ? "active" : ""}`} onClick={() => setDisplay("block")}>
                {toggler || <Button name="Open Drawer" variant="contained" color="secondary" />}
            </div>
            {display === "block" && (
                <>
                    <div
                        className={`drawer ${className} ${isOpen ? "show" : ""}`}
                        onTransitionEnd={() => !isOpen && setDisplay("none")}
                    >
                        <div onTransitionEnd={(e) => e.stopPropagation()}>
                            <Button
                                variant="circle"
                                color="dark"
                                icon={close}
                                className="drawer-close"
                                onClick={() => setIsOpen(false)}
                            />
                            {children ||
                                content ||
                                (Component && <Component callbackFromParent={callbackFromParent} />) ||
                                "drawer content"}

                            {/* {Verify whether the content is HTML to enable it to receive callbacks from the parent} */}
                            {/* {React.isValidElement(content)
                                ? React.cloneElement(content, { setActiveTab })
                                : content} */}
                        </div>
                    </div>
                    <div
                        className={`drawer-backdrop ${isOpen ? "show" : ""}`}
                        onClick={() => setIsOpen(false)}
                    ></div>
                </>
            )}
        </>
    );
}
