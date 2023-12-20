import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Carousel } from "../..";
import localData from "../../../localData";
import useLock from "../../../hooks/useLock";

// backdrop start
let globalIndex = 0;
// backdrop end
export default function ThumbnailCarousel({ items }) {
    // backdrop start
    const [display, setDisplay] = useState("none");
    const [isShow, setIsShow] = useState(false);
    const { lockScroll, unlockScroll } = useLock();
    const { close } = localData.svgs;
    // backdrop end

    // backdrop start
    const backgropSwiperRef = useRef(null);
    // backdrop end
    const backgroundSwiperRef = useRef(null);
    const thumbnailsSwiperRef = useRef(null);

    // backdrop start
    const setActiveSlide = (index, duration = 300) => {
        globalIndex = index;
        backgropSwiperRef.current?.swiper.slideTo(index, duration);
    };
    // backdrop end

    // backdrop start
    // use callback function so React can memorize it and "removeEventListener" will work properly
    const keyDown = useCallback((e) => {
        switch (e.keyCode) {
            case 39:
                if (globalIndex !== items.length - 1) globalIndex += 1;
                setActiveSlide(globalIndex);
                break;
            case 37:
                if (globalIndex !== 0) globalIndex -= 1;
                setActiveSlide(globalIndex);
                break;
            case 27:
                setIsShow(false);
                break;
        }
    }, []);
    // backdrop end

    // backdrop start
    useEffect(() => {
        if (display === "block") {
            document.addEventListener("keydown", keyDown);
            lockScroll();
            setIsShow(true);
        } else {
            document.removeEventListener("keydown", keyDown);
            unlockScroll();
        }
    }, [display]);
    // backdrop end

    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(0);

    const setActiveBackgroundSlide = (index, duration = 300) => {
        backgroundSwiperRef.current?.swiper.slideTo(index, duration);
    };
    const setActiveThumbnailSlide = (index, duration = 300) => {
        thumbnailsSwiperRef.current?.swiper.slideTo(index, duration);
    };

    function Card({ image, index }) {
        return (
            <img
                className=""
                src={image}
                // backdrop start
                onClick={() => {
                    setActiveSlide(index, 0);
                    setDisplay("block");
                }}
                // backdrop end
            />
        );
    }

    function ThumbnailCard({ image, index }) {
        return (
            <img
                className={`${activeThumbnailIndex === index ? "active" : ""}`}
                src={image}
                onClick={(e) => {
                    setActiveBackgroundSlide(index);
                    setActiveThumbnailIndex(index);
                }}
            />
        );
    }

    // backdrop start
    function BackdropCard({ image }) {
        return <img className="" src={image} />;
    }
    // backdrop end

    return (
        <div className="thumbnail-carousel">
            <Carousel
                items={items}
                Card={Card}
                options={{
                    ref: backgroundSwiperRef,
                    slidesPerView: 1,
                    spaceBetween: 100,
                    breakpoints: null,
                }}
                callback={(e) => {
                    setActiveThumbnailSlide(e.activeIndex);
                    setActiveThumbnailIndex(e.activeIndex);
                }}
            />

            <div className="thumbnails">
                <Carousel
                    items={items}
                    Card={ThumbnailCard}
                    options={{
                        ref: thumbnailsSwiperRef,
                        slidesPerView: "auto",
                        breakpoints: null,
                        spaceBetween: 20,
                        // centeredSlides: true,
                    }}
                />
            </div>

            {/*  backdrop start */}
            <div
                style={{ display }}
                className={`backdrop ${isShow ? "show" : ""}`}
                onTransitionEnd={() => !isShow && setDisplay("none")}
            >
                <Button
                    className="backdrop-closer"
                    variant="circle"
                    icon={close}
                    color="light"
                    size="lg"
                    onClick={() => setIsShow(false)}
                />
                <Carousel
                    items={items}
                    Card={BackdropCard}
                    options={{
                        ref: backgropSwiperRef,
                        spaceBetween: 10,
                        slidesPerView: 1,
                        breakpoints: null,
                        // effect: "fade",
                        // fadeEffect: { crossFade: true }, //Note that crossFade should be set to true in order to avoid seeing content behind or underneath.
                    }}
                    callback={(e) => (globalIndex = e.activeIndex)}
                />
            </div>
            {/*  backdrop end */}
        </div>
    );
}
