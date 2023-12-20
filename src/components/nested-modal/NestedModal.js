import React, { useState, useEffect } from "react";
import { Button } from "../";
import localData from "../../localData";

export default function NestedModal({
    children = "...",
    title = "nested modal",
    className = "",
    buttonTitle = "open nested modal",
    parentCallback,
}) {
    const [display, setDisplay] = useState("none");
    const [isOpen, setIsOpen] = useState(false);

    const { close } = localData.svgs;

    useEffect(() => {
        if (display === "none") return;
        setIsOpen(true);
        if (parentCallback) parentCallback();
    }, [display]);

    return (
        <>
            <Button variant="contained" name={buttonTitle} onClick={() => setDisplay("block")} />
            {display === "block" && (
                <div
                    className={`nested-modal fade ${isOpen ? "show" : ""}`}
                    onClick={() => setIsOpen(false)}
                    onTransitionEnd={() => !isOpen && setDisplay("none")}
                >
                    <div className={`nested-modal-dialog ${className}`}>
                        <div
                            className={`nested-modal-content`}
                            onClick={(e) => e.stopPropagation()}
                            onTransitionEnd={(e) => e.stopPropagation()}
                        >
                            <div className="nested-modal-header">
                                <h5 className="nested-modal-title" id="exampleModalLabel">
                                    {title}
                                </h5>
                                <Button
                                    variant="circle"
                                    color="dark"
                                    icon={close}
                                    className="btn-close"
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                            <div className="nested-modal-body">{children}</div>
                            <div className="nested-modal-footer">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ marginRight: "10px" }}
                                    onClick={() => setIsOpen(false)}
                                    name="close"
                                />
                                <Button variant="contained" name="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
