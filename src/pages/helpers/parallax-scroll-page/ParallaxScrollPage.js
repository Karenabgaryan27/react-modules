import React, { useRef} from "react";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";
import localData from "../../../localData";
import { motion, useScroll, useTransform } from "framer-motion";

// CSS ATTACHMENT PARALLAX
function CSSAttachmentParallax() {
    const { plant } = localData.images;
    return (
        <section className="css-attachment-parallax">
            <div className="container">
                <h2 className="title display-2">CSS background attachment</h2>
                <p className="description">description text here</p>
                <img className="image" src={plant} />
            </div>
        </section>
    );
}

// FRAMER PARALLAX
function FramerParallax() {
    const { trees, plant } = localData.images;
    const framerMotionParallax = useRef(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: framerMotionParallax,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
    const bgimage = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const yValue = useTransform(scrollYProgress, [0, 1], [0, -70]);
    const x = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const filter = useTransform(scrollYProgress, (v) => `blur(${v * 10}px)`);
    // const opacity = useTransform(scrollY, [ 0, 450], [1,0]);
    // const backgroundColor = useTransform(scrollY, [0, 3700], ["rgba(255,255,255,1)", "rgba(0,0,0,1)"]);
    return (
        <section className="framer-parallax" ref={framerMotionParallax}>
            <motion.img style={{ y: bgimage }} src={trees} alt="" className="bgimage" />
            <div className="container">
                <motion.h2 className="title display-2" style={{ y }}>
                    framer motion parallax
                </motion.h2>
                <motion.p style={{ x }} className="description">
                    description text here
                </motion.p>
                <motion.img style={{ y: yValue }} className="image" src={plant} />
            </div>
        </section>
    );
}


export default function ParallaxScrollPage() {
    const { pageFade } = useGlobalContext().animations;
    const { chunk1, chunk2, chunk3, chunk4, chunk5, chunk6 } = localData.images;
    const { scrollY, scrollYProgress } = useScroll();

    const titleY = useTransform(scrollYProgress, [0, 1], [0, 1400]);
    const chunk2Y = useTransform(scrollYProgress, [0, 1], [0, 600]);
    const chunk3Y = useTransform(scrollYProgress, [0, 1], [0, 800]);
    const chunk4Y = useTransform(scrollYProgress, [0, 1], [0, 1000]);
    const chunk5Y = useTransform(scrollYProgress, [0, 1], [0, 1200]);
    const chunk6Y = useTransform(scrollYProgress, [0, 1], [0, 1400]);

    return (
        <>
            <Header className="nature">
                <motion.img className="natureRellax" src={chunk6} style={{ y: chunk6Y }} alt="" />
                <motion.img className="natureRellax left" src={chunk5} style={{ y: chunk5Y }} alt="" />
                <motion.img className="natureRellax" src={chunk4} style={{ y: chunk4Y }} alt="" />
                <motion.img className="natureRellax" src={chunk3} style={{ y: chunk3Y }} alt="" />
                <motion.h1 className="display-2 natureRellax" style={{ y: titleY }}>
                    Parallax.
                </motion.h1>
                <motion.img className="natureRellax left" src={chunk2} style={{ y: chunk2Y }} alt="" />
                <img className="right" src={chunk1} alt="" />
            </Header>
            <motion.main {...pageFade} className="parallax-scroll-page">
                <CSSAttachmentParallax />
                <FramerParallax />
            </motion.main>
            <Footer/>
        </>
    );
}
