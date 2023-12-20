import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import {
    Header,
    ProductCard,
    Carousel,
    Footer,
    Lightbox,
    LightboxCarousel,
    ThumbnailCarousel,
} from "../../../components";
import localData from "../../../localData";

// LIGHTBOX SECTION
// function LightboxSection() {
//     const { flowers, mountains, waterfall } = localData.images;

//     return (
//         <section id="lightbox">
//             <div className="container">
//                 <h2 className="display-2">lightbox</h2>

//                 <Lightbox
//                     items={[
//                         { image: flowers },
//                         {
//                             image: mountains,
//                             video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//                         },
//                         { image: waterfall },
//                     ]}
//                 />
//             </div>
//         </section>
//     );
// }

// CAROUSEL SECTION
function CarouselCard({ title, image }) {
    return (
        <div className={`card carousel-card`}>
            <h4 className="display-6">{title}</h4>
            <img src={image} alt="" />
        </div>
    );
}

function CarouselSection() {
    const { flowers, mountains, waterfall, vertical } = localData.images;
    const items = [
        {
            title: "title 1",
            image: flowers,
        },
        {
            title: "title 2",
            image: vertical,
        },
        {
            title: "title 3",
            image: mountains,
        },
        {
            title: "title 3",
            image: waterfall,
        },
        {
            title: "title 3",
            image: waterfall,
        },
    ];
    return (
        <section id="carousel">
            <div className="container">
                <h2 className="display-2">carousel</h2>
                <Carousel items={items} Card={CarouselCard} options={{ spaceBetween: 10 }} />
            </div>
        </section>
    );
}

// LIGHTBOX SECTION
function LightboxSection() {
    const { flowers, mountains, waterfall, vertical } = localData.images;

    const items = [
        {
            image: flowers,
        },
        {
            image: vertical,
        },
        {
            image: mountains,
        },
        {
            image: waterfall,
        },
    ];

    return (
        <section>
            <div className="container">
                <h2 className="display-2">lightbox</h2>
                <Lightbox items={items} />
            </div>
        </section>
    );
}

// LIGHTBOX-CAROUSEL SECTION
function LightboxCarouselSection() {
    const { flowers, mountains, waterfall, vertical } = localData.images;

    const items = [
        {
            image: flowers,
        },
        {
            image: vertical,
        },
        {
            image: mountains,
        },
        {
            image: waterfall,
        },
    ];

    return (
        <section>
            <div className="container">
                <h2 className="display-2">lightbox carousel</h2>
                <LightboxCarousel items={items} />
            </div>
        </section>
    );
}

// THUMBNAIL-CAROUSEL SECTION
function ThumbnailCarouselSection() {
    const { flowers, mountains, waterfall, vertical } = localData.images;

    const items = [
        {
            image: flowers,
        },
        {
            image: vertical,
        },
        {
            image: mountains,
        },
        {
            image: waterfall,
        },
        {
            image: waterfall,
        },
        {
            image: waterfall,
        },
        {
            image: waterfall,
        },
        {
            image: waterfall,
        },
        {
            image: waterfall,
        },
    ];

    return (
        <section>
            <div className="container">
                <h2 className="display-2">thumbnail carousel</h2>
                <ThumbnailCarousel items={items} />
            </div>
        </section>
    );
}

// LAZY-CAROUSEL SECTION
function LazyCarouselCard({ title, image }) {
    return (
        <div className={`card carousel-card`}>
            <h4 className="display-6">{title}</h4>
            <img data-src={image} alt="" className="swiper-lazy" />
            <div className="swiper-lazy-preloader"></div>
        </div>
    );
}
function LazyLoadingCarouselSection() {
    const { images } = localData;

    const items = [
        {
            title: "title 1",
            image: images.galleryImage1,
        },
        {
            title: "title 2",
            image: images.galleryImage2,
        },
        {
            title: "title 3",
            image: images.galleryImage3,
        },
        {
            title: "title 4",
            image: images.galleryImage4,
        },
        {
            title: "title 5",
            image: images.galleryImage5,
        },
        {
            title: "title 6",
            image: images.galleryImage6,
        },
        {
            title: "title 7",
            image: images.galleryImage7,
        },
        {
            title: "title 8",
            image: images.galleryImage8,
        },
        {
            title: "title 9",
            image: images.galleryImage9,
        },
        {
            title: "title 10",
            image: images.galleryImage10,
        },
    ];

    return (
        <section>
            <div className="container">
                <h2 className="display-2">lazy carousel</h2>
                <Carousel
                    items={items}
                    Card={LazyCarouselCard}
                    options={{
                        spaceBetween: 10,
                        lazy: {
                            threshold: 50,
                            sequential: false,
                            observer: true,
                            loadPrevNext: true,
                            loadPrevNextAmount: 1,
                            loadOnTransitionStart: false,
                        },
                    }}
                />
            </div>
        </section>
    );
}

export default function CarouselPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="carousel" />
            <motion.main {...pageFade} className="carousel-page">
                {/* <LightboxSection /> */}
                <CarouselSection />
                <LightboxSection />
                <LightboxCarouselSection />
                <ThumbnailCarouselSection />
                <LazyLoadingCarouselSection />
            </motion.main>
            <Footer />
        </>
    );
}
