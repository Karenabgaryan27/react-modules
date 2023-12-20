import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";
import localData from "../../../localData";
import { useObserver } from "../../../hooks/lazy-load/useObserver";

function ObserverItem({ item, index, inView, variants, delay }) {
    const { preloader } = localData.images;
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    return (
        <div
            key={index}
            className={` ${inView ? "lazy-animate" : ""}`}
            data-lazy={variants}
            style={{ transitionDelay: (delay || index * 0.1) + "s" }}
        >
            <div className="card v1-card">
                <img style={{ display: "none" }} src={item.image} onLoad={() => setIsImageLoaded(true)} />
                <img src={isImageLoaded ? item.image : preloader} alt="flowers" />
            </div>
        </div>
    );
}

export default function FormPage() {
    const { pageFade } = useGlobalContext().animations;
    const { flowers, mountains, waterfall, trees, preloader } = localData.images;
    const [items, setItems] = useState([
        {
            image: flowers,
        },
        {
            image: mountains,
        },
        {
            image: trees,
        },
        {
            image: waterfall,
        },
    ]);
    const { ref: cardGroupV1Ref, inView: inViewV1 } = useObserver();
    const { ref: cardGroupV2Ref, inView: inViewV2 } = useObserver();
    const { ref: cardGroupV3Ref, inView: inViewV3 } = useObserver();
    const { ref: cardGroupV4Ref, inView: inViewV4 } = useObserver();

    const [inViewV5, setIsInViewV5] = useState(false);
    const [inViewV6, setIsInViewV6] = useState(false);
    const [inViewV7, setIsInViewV7] = useState(false);
    const [inViewV8, setIsInViewV8] = useState(false);

    const cardGroupV9Ref = useRef(null);
    const inViewV9 = useInView(cardGroupV9Ref,{amount: 0.9,once: true});

    return (
        <>
            <Header title="lazy load" />
            <motion.main {...pageFade} className="lazy-load-page">
                <section id="observer-lazy-load">
                    <div className="container">
                        <h2 className="display-2">intersection observer lazy load</h2>
                        <div className={`card-group card-group-v1`} ref={cardGroupV1Ref}>
                            {items.map((item, index) => (
                                <ObserverItem key={index} {...{ item, index, inView: inViewV1, variants: "fade-up" }} />
                            ))}
                        </div>
                        <div className={`card-group card-group-v2`} ref={cardGroupV2Ref}>
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{ item, index, inView: inViewV2, variants: "fade-left" }}
                                />
                            ))}
                        </div>
                        <div className={`card-group card-group-v3`} ref={cardGroupV3Ref}>
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                        inView: inViewV3,
                                        delay: index === 0 ? "0" : index == 1 ? "0.6" : index == 2 ? "0.4" : "0.9",
                                        variants: "fade",
                                    }}
                                />
                            ))}
                        </div>
                        <div
                            className={`card-group card-group-v4  ${inViewV4 ? "lazy-animate" : ""}`}
                            ref={cardGroupV4Ref}
                            data-lazy="fade-up"
                        >
                            {items.map((item, index) => (
                                <ObserverItem key={index} {...{ item, index }} />
                            ))}
                        </div>
                    </div>
                </section>

                <section id="framer-lazy-load">
                    <div className="container">
                        <h2 className="display-2">framer motion lazy load</h2>
                        <motion.div
                            className={`card-group card-group-v1`}
                            viewport={{ amount: 0.3 }}
                            whileInView={() => setIsInViewV5(true)}
                        >
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                        inView: inViewV5,
                                        variants: "fade-up",
                                    }}
                                />
                            ))}
                        </motion.div>
                        <motion.div
                            className={`card-group card-group-v1`}
                            viewport={{ amount: 0.3 }}
                            whileInView={() => setIsInViewV6(true)}
                        >
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                        inView: inViewV6,
                                        variants: "fade-left",
                                    }}
                                />
                            ))}
                        </motion.div>
                        <motion.div
                            className={`card-group card-group-v1`}
                            viewport={{ amount: 0.3 }}
                            whileInView={() => setIsInViewV7(true)}
                        >
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                        inView: inViewV7,
                                        delay: index === 0 ? "0" : index == 1 ? "0.6" : index == 2 ? "0.4" : "0.9",
                                        variants: "fade",
                                    }}
                                />
                            ))}
                        </motion.div>
                        <motion.div
                            className={`card-group card-group-v1  ${inViewV8 ? "lazy-animate" : ""}`}
                            viewport={{ amount: 0.9 }}
                            whileInView={() => setIsInViewV8(true)}
                            data-lazy="fade-up"
                        >
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                    }}
                                />
                            ))}
                        </motion.div>
                        <div
                            ref={cardGroupV9Ref}
                            className={`card-group card-group-v4  ${inViewV9 ? "lazy-animate" : ""}`}
                            data-lazy="fade-up"
                        >
                            {items.map((item, index) => (
                                <ObserverItem
                                    key={index}
                                    {...{
                                        item,
                                        index,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
