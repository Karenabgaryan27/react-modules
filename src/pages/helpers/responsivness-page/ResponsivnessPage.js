import React, { useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../../../context";
import { Header,Footer } from "../../../components";
import localData from "../../../localData";
import { motion} from "framer-motion";

export default function ResponsivnessPage() {
    const { pageFade } = useGlobalContext().animations;
    const { green, blue,black, purp } = localData.images;
    return (
        <>
            <Header title="responsivness"/> 
            <motion.main {...pageFade} className="parallax-scroll-page">
            <section>
                    <div className="container">
                        <h2 className="display-2">flex variant cards</h2>
                        <div className="card-group illustration-card-group">
                            <div className="card  illustration-card illustration-card-purp">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={purp} alt="" />
                            </div>
                            <div className="card  illustration-card illustration-card-blue">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={blue} alt="" />
                            </div>
                            <div className="card  illustration-card illustration-card-black">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={black} alt="" />
                            </div>
                            {/* <div className="card  illustration-card illustration-card-green">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={green} alt="" />
                            </div> */}
                        
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container">
                        <h2 className="display-2">grid variant cards</h2>
                        <div className="card-group illustrationV2-card-group">
                            <div className="card  illustrationV2-card illustrationV2-card-purp">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={purp} alt="" />
                            </div>
                            <div className="card  illustrationV2-card illustrationV2-card-blue">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={blue} alt="" />
                            </div>
                            <div className="card  illustrationV2-card illustrationV2-card-black">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={black} alt="" />
                            </div>
                            {/* <div className="card  illustrationV2-card illustrationV2-card-green">
                                <h4 className="card-title">Some card</h4>
                                <img className='card-image' src={green} alt="" />
                            </div> */}
                        
                        </div>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
