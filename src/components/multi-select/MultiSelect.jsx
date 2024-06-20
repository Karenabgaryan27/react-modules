import React, { useState, useEffect, useRef } from "react";
import localData from "../../localData";
import { Button } from "..";

export default function MultiSelect({
    items = [],
    setItems = () => console.log('Error: "setItems function required"'),
    placeholder = "select tags",
    className = "",
    variant = "outlined",
    color = "secondary",
    toggleIcon,
    children,
    limitTags,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(-1);

    const clickWrapper = useRef(null);
    const selectRef = useRef(null);

    const { chevronDown, close } = localData.svgs;

    useEffect(() => {
        let handler = (e) => !clickWrapper.current.contains(e.target) && setIsOpen(false);
        document.addEventListener("click", handler);
        return () => document.removeEventListener("click", handler);
    });

    const openMenu = () => {
        setIsOpen(true);

        // setTimeout(() => scrollIntoView(), 100);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const setSelected = (id) => {
        let tempItems = [...items];
        tempItems = tempItems.map((item) => (item.id === id ? { ...item, isSelected: true } : { ...item }));
        setItems(tempItems);
        // setSelectedOption(tempItems.findIndex((item) => item.isSelected === true));
    };
    const removeSelected = (id) => {
        let tempItems = [...items];
        tempItems = tempItems.map((item) => (item.id === id ? { ...item, isSelected: false } : { ...item }));
        setItems(tempItems);
        // setSelectedOption(tempItems.findIndex((item) => item.isSelected === true));
    };

    // const scrollIntoView = () => {
    //     const activeItem = selectedOptionRef.current;
    //     activeItem?.scrollIntoView({
    //         // behavior: 'smooth',
    //         block: "nearest",
    //         inline: "nearest",
    //     });
    // };

    // const handleKeyDown = (e) => {
    //     if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault(); // to prevent autocompleteField default behaviour when pressed ArrowUp or ArrowDown
    //     if (e.key === "Tab") closeMenu();
    //     if (["ArrowUp", "ArrowDown"].includes(e.key) && !isOpen) {
    //         openMenu();
    //         return;
    //     }
    //     switch (e.key) {
    //         case "ArrowDown":
    //             if (selectedOption >= items.length - 1) return;
    //             setSelectedOption((prevIndex) => prevIndex + 1);
    //             break;
    //         case "ArrowUp":
    //             if (selectedOption <= 0) return;
    //             setSelectedOption((prevIndex) => prevIndex - 1);
    //             break;
    //         case "Enter":
    //             selectedOptionRef.current?.click();
    //             isOpen && setTimeout(()=>closeMenu(),0)
    //             break;
    //     }
    // };

    // useEffect(() => {
    //     scrollIntoView();
    // }, [selectedOption]);

    const getPlaceholder = () => {
        return (
            <div className="wrapper placeholder">
                <span className="multi-select-toggle-title">{placeholder}</span>
            </div>
        );
    };

    const getSelectedItems = () => {
        const selectedItems = items.filter((item) => item.isSelected && { ...item });

        if (!selectedItems.length) return getPlaceholder();

        return (
            <div className="wrapper">
                {selectedItems.map(({ startIcon, endIcon, title, id }, index) => {
                    if (index >= limitTags) return;
                    return (
                        <div className="multi-select-tag" key={index} onClick={(e) => e.stopPropagation()}>
                            {startIcon && <span className="startIcon">{startIcon}</span>}
                            <span className={`multi-select-tag-title`}>{title}</span>
                            {endIcon && <span className="endIcon">{endIcon}</span>}
                            <span className="multi-select-tag-close" onClick={() => removeSelected(id)}>
                                {close}
                            </span>
                        </div>
                    );
                })}
                {selectedItems.length > limitTags && (
                    <span
                        className="rest"
                        title={selectedItems
                            .map((item, index) => (index > 1 ? " " + item.title : ""))
                            .join(", ")
                            .replace(/[^a-zA-Z0-9\s]/g, "")}
                    >
                        +{selectedItems.length - limitTags} items
                    </span>
                )}
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
        <div className={`multi-select ${isOpen ? "active" : ""}  ${className}`} ref={selectRef}>
            <div className="multi-select-toggle-wrapper" ref={clickWrapper}>
                <Button
                    className={`multi-select-toggle`}
                    data-toggle="select"
                    onClick={() => (isOpen ? closeMenu() : openMenu())}
                    variant={variant}
                    color={color}
                    // onKeyDown={handleKeyDown}
                >
                    {!items.length ? getPlaceholder() : getSelectedItems()}
                    <span
                        className="endIcon multi-select-toggle-icon"
                        // onClick={() => (isOpen ? closeMenu() : openMenu())}
                    >
                        {toggleIcon || chevronDown}
                    </span>
                </Button>
            </div>

            {/* {isOpen && ( // don't render menu while it closed */}
            <div className="multi-select-menu">
                {!items.length || !items.find((item) => !item.isSelected) ? (
                    <div className="multi-select-item disabled">empty.</div>
                ) : (
                    items.map(
                        ({ isSelected, title, startIcon, endIcon, id }, index) =>
                            !isSelected && (
                                <div
                                    key={index}
                                    id={`multi-select-item-${id}`}
                                    className={`multi-select-item`}
                                    onClick={() => setSelected(id)}
                                >
                                    {startIcon && <span className="startIcon">{startIcon}</span>}
                                    <span className="multi-select-item-title">{title}</span>
                                    {endIcon && <span className="endIcon">{endIcon}</span>}
                                </div>
                            )
                    )
                )}
                {children}
            </div>
            {/* )} */}
        </div>
    );
}
