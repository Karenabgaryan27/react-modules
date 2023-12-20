import React,{useEffect} from "react";
import { Header, Footer } from "../../components";
import localData from "../../localData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";

export default function About() {
    const {pageFade} = useGlobalContext().animations

    return (
        <>
            <Header title="about"/>
            <motion.main {...pageFade} className="about-page">
                <section className="example" data-lazy-block>
                    <div className="container">
                        <h2 className="example-title display-2">example</h2>
                        <p className="example-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eius et consequatur eaque
                            recusandae ipsa quae harum, illo quidem cum quos ratione blanditiis iure sequi vero nam odit
                            dolor rerum? Quam itaque harum molestias explicabo suscipit quas voluptates maiores
                            mollitia.
                        </p>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
