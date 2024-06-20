import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header,Footer, ImageCrop } from "../../../components";

export default function RestPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="rest" />
            <motion.main {...pageFade} className="rest-page">
                <ImageCrop/>
            </motion.main>
            <Footer/>
        </>
    );
}
