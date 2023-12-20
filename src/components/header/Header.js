import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";
import {Navbar} from '../'

export default function Header({ title, className, children }) {
    const { pageFade } = useGlobalContext().animations;

    return (
        <motion.header {...pageFade} className={"hero " + className}>
            <Navbar/>
            <div className="container">
                {title && <h1 className="hero-title display-1">{title}</h1>} {children}
            </div>
        </motion.header>
    );
}
