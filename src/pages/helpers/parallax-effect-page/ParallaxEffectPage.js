import React from "react";
import { useGlobalContext } from "../../../context";
import { Header, Footer, Button, JsHoverCard, JsWindowCard,FramerDraggableCard } from "../../../components";
import localData from "../../../localData";
import { motion } from "framer-motion";
import useParallaxEffect from "../../../hooks/useParallaxEffect";

function RotateingCardsSection() {
    const { purp, blue, black } = localData.images;
    return (
        <section className="rotating-cards">
            <div className="container">
                <h2 className="display-2">rotating cards</h2>
                <div className="card-group rotating-card-group">
                    <div className="card rotating-card rotating-card-purp">
                        <div className="card-back card-content">
                            <div className="card-depth">
                                <p className="card-back-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cupiditate
                                    quibusdam nobis nesciunt consequatur reprehenderit alias consequuntur minus
                                    provident.
                                </p>
                                <a href="#/" target="_blank" className="link link-dark card-btn" >
                                    learn more
                                </a>
                            </div>
                        </div>
                        <div className="card-front card-content">
                            <div className="card-depth">
                                <h4 className="card-title">some card</h4>
                                <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                <img className="card-image" src={purp} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="card rotating-card rotating-card-blue">
                        <div className="card-back card-content">
                            <div className="card-depth">
                                <p className="card-back-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cupiditate
                                    quibusdam nobis nesciunt consequatur reprehenderit alias consequuntur minus
                                    provident.
                                </p>
                                <a href="#/" target="_blank" className="link link-dark card-btn" >
                                    learn more
                                </a>
                            </div>
                        </div>
                        <div className="card-front card-content">
                            <div className="card-depth">
                                <h4 className="card-title">some card</h4>
                                <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                <img className="card-image" src={blue} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="card rotating-card rotating-card-black">
                        <div className="card-back card-content">
                            <div className="card-depth">
                                <p className="card-back-description">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente cupiditate
                                    quibusdam nobis nesciunt consequatur reprehenderit alias consequuntur minus
                                    provident.
                                </p>
                                <a href="#/" target="_blank" className="link link-dark card-btn" >
                                    learn more
                                </a>
                            </div>
                        </div>
                        <div className="card-front card-content">
                            <div className="card-depth">
                                <h4 className="card-title">some card</h4>
                                <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                                <img className="card-image" src={black} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function JSHoverCardsSection() {
    const { purp, blue, black } = localData.images;
    const items = [
        {
            image: purp,
            className: "js-hover-card-purp",
            title: "basic card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
        {
            image: blue,
            className: "js-hover-card-blue",
            title: "glaring card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            glare: true,
            maxGlare: 0.8,
        },
        {
            image: black,
            className: "js-hover-card-black",
            title: "reverse card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
            reverse: true,
        },
    ];

    return (
        <section className="js-hover-cards">
            <div className="container">
                <h2 className="display-2">JS hover cards</h2>
                <div className="card-group js-hover-card-group">
                    {items.map((item, index) => (
                        <JsHoverCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function JSWindowCardsSection() {
    const { comics1, comics2, comics3 } = localData.images;
    const items = [
        {
            cover: comics1,
            title: "comics card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
        {
            cover: comics2,
            title: "comics card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
        {
            cover: comics3,
            title: "comics card",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
    ];

    return (
        <section className="js-window-cards">
            <div className="container">
                <h2 className="display-2">JS window cards</h2>
                <div className="card-group js-window-card-group">
                    {items.map((item, index) => (
                        <JsWindowCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function JSBigCardSection() {
    const { ipad,phone } = localData.images;

    const { start, end, move } = useParallaxEffect({
        axisDepth: 150,
        reverse: true,
        // glare: true,
        imageReverse: true,
        speed: 800,
        imageSpeed: 600,
        imageRange: 2,
    });

    return (
        <section className="js-big-cards">
            <div className="container">
                <h2 className="display-2">JS big card</h2>
                <div className={`card js-big-card`} onMouseMove={move} onMouseLeave={end} onMouseEnter={start}>
                    <div className="card-inner" data-parallax-inner>
                        <div className="wrapper">
                            <h4 className="card-title">some card</h4>
                            <p className="card-description">
                                Lorem ipsum dolor sit amet conse sametegg ctetur adipisicing elit. Ipsam eum deleniti impedit ipsa repellat odit!
                            </p>
                            <Button variant="contained" name="some button" className='btn btn-primary' />
                        </div>
                        <div className="card-cover" >
                            <img src={ipad} alt="" data-parallax-image data-parallax-range='3' />
                            <img src={phone} alt="" data-parallax-image data-parallax-speed='400' data-parallax-range='4' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FramerDraggableCardsSection() {
    const { purp, blue, black } = localData.images;
    const items = [
        {
            image: purp,
            className: "framer-draggable-card-purp",
            title: "some title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
        {
            image: blue,
            className: "framer-draggable-card-blue",
            title: "some title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
        {
            image: black,
            className: "framer-draggable-card-black",
            title: "some title",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        },
    ];

    return (
        <section className="framer-draggable-cards">
            <div className="container">
                <h2 className="display-2">Framer motion draggable cards</h2>
                <div
                    className="card-group framer-draggable-card-group"
                    style={{ perspective: 2000, transform: "scale(0.95)" }}
                >
                    {items.map((item, index) => (
                        <FramerDraggableCard key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function ParallaxEffectPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="parallax effect" />
            <motion.main {...pageFade} className="parallax-effect-page">
                <RotateingCardsSection />
                <JSHoverCardsSection />
                <JSWindowCardsSection />
                <JSBigCardSection />
                <FramerDraggableCardsSection />
            </motion.main>
            <Footer/>
        </>
    );
}
