import React, { useState, useEffect, useRef } from "react";
import localData from "../../localData";
import { Button } from "../";
// import { v4 as uuidv4 } from "uuid";

export default function Autocomplete({
    items = [],
    setItems = () => console.log('Error: "setItems function required"'),
    placeholder = "autocomplete",
    className = "",
    variant,
    color,
    toggleIcon,
    children,
}) {
    const [localItems, setLocalItems] = useState(items);
    const [isOpen, setIsOpen] = useState(false);
    const [fieldValue, setFieldValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [activeOption, setActiveOption] = useState(-1);

    const clickWrapper = useRef(null);
    const autocompleteRef = useRef(null);
    const activeOptionRef = useRef(null);

    const { chevronDown } = localData.svgs;

    useEffect(() => {
        let handler = (e) => {
            const isClickedOutside = !clickWrapper.current.contains(e.target);
            isClickedOutside && closeMenu();
        };
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });

    const openMenu = () => {
        setIsOpen(true);
        setLocalItems(items);

        setTimeout(() => scrollIntoView(), 100);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setFieldValue("");
    };

    const handleChange = (e) => {
        if(!isOpen) openMenu()
        let tempItems = [...items];
        tempItems = tempItems.filter((item) => {
            if (item.title.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                return item;
            }
        });
        setFieldValue(e.target.value);
        setLocalItems(tempItems);
        setActiveOption(-1);
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
        if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key) && !isOpen) {
            openMenu();
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                if (activeOption >= localItems.length - 1) return;
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
            <div className="wrapper placeholder" style={{ opacity: isOpen && (fieldValue ? 0 : isOpen ? "0.4" : "1") }}>
                <span className="autocomplete-toggle-title">{placeholder}</span>
            </div>
        );
    };

    const getActiveItem = () => {
        const activeItem = items.find((item) => item.isActive);

        if (!activeItem) return getPlaceholder();

        const { title, startIcon, endIcon } = activeItem;

        return (
            <div className="wrapper" style={{ opacity: isFocused && (fieldValue ? 0 : isOpen ? "0.4" : "1") }}>
                {startIcon && <span className="startIcon">{startIcon}</span>}
                <span className={`autocomplete-toggle-title`}>{title}</span>
                {endIcon && <span className="endIcon">{endIcon}</span>}
            </div>
        );
    };

    // don't render menu while it closed (replace "isOpen" variable with "isAnimate" from autocmoplete classname and remove commented isOpen scopes around menu)
    // const [isAnimate, setIsAnimate] = useState(false);

    // useEffect(() => {
    //     setIsAnimate(isOpen);
    // }, [isOpen]);
    //

    return (
        <div className={`autocomplete ${isOpen ? "active" : ""}  ${className}`} ref={autocompleteRef}>
            <div className="autocomplete-toggle-wrapper" ref={clickWrapper}>
                <Button
                    tabIndex={-1}
                    className={`autocomplete-toggle`}
                    data-toggle="autocomplete"
                    onKeyDown={(e) => e.keyCode === 13 && setIsOpen(true)}
                    variant={variant}
                    color={color}
                    onClick={openMenu}
                >
                    <input
                        type="text"
                        className="autocomplete-field"
                        value={fieldValue}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={handleKeyDown}
                    />
                    {!items.length ? getPlaceholder() : getActiveItem()}
                    <span
                        className="endIcon autocomplete-toggle-icon"
                        onClick={(e) => {
                            // e.stopPropagation();
                            isOpen ? closeMenu() : openMenu();
                        }}
                    >
                        {toggleIcon || chevronDown}
                    </span>
                </Button>
            </div>

            {/* {isOpen && ( // don't render menu while it closed */}
                <div className="autocomplete-menu">
                    {!localItems.length ? (
                        <div className="autocomplete-item disabled">no results found.</div>
                    ) : (
                        localItems.map(({ title, startIcon, endIcon, id }, index) => (
                            <div
                                key={index}
                                id={`autocomplete-item-${id}`}
                                className={`autocomplete-item ${activeOption === index ? "active" : ""}`}
                                onClick={() => setActive(id)}
                                ref={activeOption === index ? activeOptionRef : null}
                            >
                                {startIcon && <span className="startIcon">{startIcon}</span>}
                                <span className="autocomplete-item-title">{title}</span>
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
