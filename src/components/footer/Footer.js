import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";

export default function Footer() {
    const { pageFade } = useGlobalContext().animations;
    return (
        <motion.footer {...pageFade} className="footer bg-dark">
            <div className="container">
                <h2 className="display-2">footer</h2>
                <div
                    className="links-group"
                    style={{
                        display: "inline-flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                    }}
                >
                    <a href="#/" target="_blank" className="link link-secondary">
                        external link default
                    </a>
                    <a href="#/" target="_blank" className="link link-primary" underline="hover">
                        external link hover
                    </a>
                    <a href="#/" target="_blank" className="link link-success" underline="always">
                        external link always
                    </a>
                    <a href="#/" target="_blank" className="link link-danger" underline="none">
                        external link none
                    </a>
                </div>
            </div>
        </motion.footer>
    );
}
