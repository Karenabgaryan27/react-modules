import React, { useState, useEffect } from "react";
import { Dropdown, ControlledAccordion, Drawer, Search, Button } from "../";
import { Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import localData from "../../localData";

const menu = [
    { title: "home", to: "/" },
    { title: "about", to: "/about" },
    { title: "products", to: "/products" },
];

const modules = [
    { title: "button", to: "/modules/button", id: uuidv4() },
    { title: "popup", to: "/modules/popup", id: uuidv4() },
    { title: "form", to: "/modules/form", id: uuidv4() },
    { title: "progress", to: "/modules/progress", id: uuidv4() },
    { title: "carousel", to: "/modules/carousel", id: uuidv4() },
    { title: "pagination", to: "/modules/pagination", id: uuidv4() },
    { title: "drag and drop", to: "/modules/drag-and-drop", id: uuidv4() },
    { title: "chat", to: "/modules/chat", id: uuidv4() },
    { title: "rest", to: "/modules/rest", id: uuidv4() },
];

const helpers = [
    { title: "send, receive email", to: "/helpers/send-email", id: uuidv4() },
    { title: "lazy load", to: "/helpers/lazy-load", id: uuidv4() },
    { title: "parallax scroll", to: "/helpers/parallax-scroll", id: uuidv4() },
    { title: "parallax effect", to: "/helpers/parallax-effect", id: uuidv4() },
    { title: "responsivness", to: "/helpers/responsivness", id: uuidv4() },
];

const DrawerComponent = ({ parentCallback }) => {
    const location = useLocation();

    return (
        <>
            {menu.map(({ title, to }, index) => (
                <li className="nav-item" key={index}>
                    <Link
                        to={to}
                        className={`nav-link ${to === location.pathname ? "active" : ""}`}
                        onClick={parentCallback}
                    >
                        {title}
                    </Link>
                </li>
            ))}
            <ControlledAccordion
                items={[
                    {
                        buttonName: "modules",
                        variant: "text",
                        color: "secondary",
                        content: modules.map(({ title, to }, index) => (
                            <Link key={index} to={to} className="nav-link" onClick={parentCallback}>
                                {title}
                            </Link>
                        )),
                    },
                    {
                        buttonName: "helpers",
                        variant: "text",
                        color: "secondary",
                        content: helpers.map(({ title, to }, index) => (
                            <Link key={index} to={to} className="nav-link" onClick={parentCallback}>
                                {title}
                            </Link>
                        )),
                    },
                ]}
            />
        </>
    );
};

export default function Navbar() {
    const location = useLocation();
    const { bars } = localData.svgs;

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>
                {/* <div className="burger">
                    <span></span>
                </div> */}
                <Drawer
                    toggler={<Button className="navbar-toggler" color="light" variant="circle" icon={bars} />}
                    Component={DrawerComponent}
                />

                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        {menu.map(({ title, to }, index) => (
                            <li className="nav-item" key={index}>
                                <Link
                                    to={to}
                                    className={`nav-link ${to === location.pathname ? "active" : ""}`}
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                        <Dropdown
                            {...{ className: "nav-item", title: "modules", isInsideClick: true }}
                            items={modules}
                        />

                        <Dropdown
                            {...{ className: "nav-item", title: "helpers", isInsideClick: true }}
                            items={helpers}
                        />
                    </ul>
                    <form className="d-flex">
                        <Search color="light" />
                    </form>
                </div>
            </div>
        </nav>
    );
}
