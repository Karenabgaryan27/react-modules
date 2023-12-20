import React, { useState, useEffect, useRef } from "react";
import localData from "../../localData";
import { Button } from "../";

export default function Select({
    items = [],
    setItems = () => console.log('Error: "setItems function required"'),
    placeholder = "select",
    className = "",
    variant,
    color,
    toggleIcon,
    children,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState(-1);

    const clickWrapper = useRef(null);
    const selectRef = useRef(null);
    const activeOptionRef = useRef(null);

    const { chevronDown } = localData.svgs;

    useEffect(() => {
        let handler = (e) => !clickWrapper.current.contains(e.target) && setIsOpen(false);
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });

    const openMenu = () => {
        setIsOpen(true);

        setTimeout(() => scrollIntoView(), 100);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const setActive = (id) => {
        let tempItems = [...items];
        tempItems = tempItems.map((item) => ({ ...item, isActive: item.id === id }));
        setItems(tempItems);

        setActiveOption(tempItems.findIndex((item) => item.isActive === true));
    };
    
    const scrollIntoView = () => {
        const activeItem = activeOptionRef.current;
        activeItem?.scrollIntoView({
            // behavior: 'smooth',
            block: "nearest",
            inline: "nearest",
        });
    };

    const handleKeyDown = (e) => {
        if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault(); // to prevent autocompleteField default behaviour when pressed ArrowUp or ArrowDown
        if (e.key === "Tab") closeMenu();
        if (["ArrowUp", "ArrowDown"].includes(e.key) && !isOpen) {
            openMenu();
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                if (activeOption >= items.length - 1) return;
                setActiveOption((prevIndex) => prevIndex + 1);
                break;
            case "ArrowUp":
                if (activeOption <= 0) return;
                setActiveOption((prevIndex) => prevIndex - 1);
                break;
            case "Enter":
                activeOptionRef.current?.click();
                isOpen && setTimeout(()=>closeMenu(),0) 
                break;
        }
    };

    useEffect(() => {
        scrollIntoView();
    }, [activeOption]);

    const getPlaceholder = () => {
        return (
            <div className="wrapper placeholder">
                <span className="select-toggle-title">{placeholder}</span>
            </div>
        );
    };

    const getActiveItem = () => {
        const activeItem = items.find((item) => item.isActive);

        if (!activeItem) return getPlaceholder();

        const { title, startIcon, endIcon } = activeItem;

        return (
            <div className="wrapper">
                {startIcon && <span className="startIcon">{startIcon}</span>}
                <span className={`select-toggle-title`}>{title}</span>
                {endIcon && <span className="endIcon">{endIcon}</span>}
            </div>
        );
    };

    // don't render menu while it closed (replace "isOpen" variable with "isAnimate" from select classname and remove commented isOpen scopes around menu)
    // const [isAnimate, setIsAnimate] = useState(false);

    // useEffect(() => {
    //     setIsAnimate(isOpen);
    // }, [isOpen]);
    //

    return (
        <div className={`select ${isOpen ? "active" : ""}  ${className}`} ref={selectRef}> 
            <div className="select-toggle-wrapper" ref={clickWrapper}>
                <Button
                    className={`select-toggle`}
                    data-toggle="select"
                    onClick={()=>isOpen ? closeMenu() : openMenu() }
                    variant={variant}
                    color={color}
                    onKeyDown={handleKeyDown}
                >
                    {!items.length ? getPlaceholder() : getActiveItem()}
                    <span className="endIcon select-toggle-icon">{toggleIcon || chevronDown}</span>
                </Button>
            </div>

            {/* {isOpen && ( // don't render menu while it closed */}
            <div className="select-menu">
                {!items.length ? (
                    <div className="select-item disabled">empty.</div>
                ) : (
                    items.map(({ title, startIcon, endIcon, id }, index) => (
                        <div
                            key={index}
                            id={`select-item-${id}`}
                            className={`select-item ${activeOption === index ? "active" : ""}`}
                            onClick={() => setActive(id)}
                            ref={activeOption === index ? activeOptionRef : null}
                        >
                            {startIcon && <span className="startIcon">{startIcon}</span>}
                            <span className="select-item-title">{title}</span>
                            {endIcon && <span className="endIcon">{endIcon}</span>}
                        </div>
                    ))
                )}
                {children}
            </div>
            {/* )} */}
        </div>
    );
}
