import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import {
    Header,
    Footer,
    ProgressBar,
    CircularProgressBar,
    RangeSlider,
    MultiRangeSlider,
    Checkbox,
    Switch,
    CounterOnScroll,
} from "../../../components";

function ProgressBarSection() {
    return (
        <section id="progress-bar">
            <div className="container">
                <h2 className="display-2">progress bar</h2>
                <ProgressBar />
                <br />
                <CircularProgressBar progress={90} />
                <CircularProgressBar progress={47} duration={3000} />
            </div>
        </section>
    );
}

function SliderSection() {
    return (
        <section id="slider">
            <div className="container">
                <h2 className="display-2">range slider</h2>
                <RangeSlider progress={70} />
                <br />
                <MultiRangeSlider />
                <MultiRangeSlider rightProgress={50} />
                <Checkbox disabled={true} />
                <br />
                <Checkbox />
                <br />
                <Checkbox checked={true} color="danger" />
                <br />
                <Checkbox color="success" label="checkbox input" />
                <br />
                <br />
                <Switch />
                <br />
                <Switch color="danger" checked={true} />
                <br />
                <Switch color="success" label="switch checkbox input" />
            </div>
        </section>
    );
}

function CounterOnScrollSection() {
    return (
        <section id="counter-on-scroll">
            <div className="container">
                <h2 className="display-2">counter on scroll</h2>
                <div className="conterOnScroll-group" style={{display: 'flex',gap: '100px'}}>
                    <CounterOnScroll duration={10000} color="success" progress={25} />
                    <CounterOnScroll duration={5000} color="warning" progress={50} />
                    <CounterOnScroll duration={2500} color="danger" progress={100} />
                </div>
            </div>
        </section>
    );
}

export default function ProgressPage() {
    const { pageFade } = useGlobalContext().animations;
    return (
        <>
            <Header title="progress bar" />
            <motion.main {...pageFade} className="modal-page">
                <ProgressBarSection />
                <SliderSection />
                <CounterOnScrollSection />
            </motion.main>
            <Footer />
        </>
    );
}
