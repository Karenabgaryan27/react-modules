import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";

export default function RestPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="rest" />
            <motion.main {...pageFade} className="rest-page">
            </motion.main>
            <Footer/>
        </>
    );
}
