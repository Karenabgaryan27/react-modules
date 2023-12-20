import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Carousel } from "../..";
import localData from "../../../localData";
import useLock from "../../../hooks/useLock";

let globalIndex = 0;
export default function LightboxCarousel({ items }) {
    const [display, setDisplay] = useState("none");
    const [isShow, setIsShow] = useState(false);
    const { lockScroll, unlockScroll } = useLock();
    const { close } = localData.svgs;

    const swiperRef = useRef(null);

    const setActiveSlide = (index, duration = 300) => {
        swiperRef.current?.swiper.slideTo(index, duration);
    };

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

    function Card({ image, index }) {
        return (
            <img
                className=""
                src={image}
                onClick={() => {
                    setActiveSlide(index, 0);
                    setDisplay("block");
                }}
            />
        );
    }

    function BackdropCard({ image }) {
        return <img className="" src={image} />;
    }

    return (
        <div className="lightbox-carousel">
            <Carousel
                items={items}
                Card={Card}
                options={{
                    spaceBetween: 100,
                    breakpoints: {
                        320: {
                            slidesPerView: 3,
                        },
                    },
                }}
            />
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
                        ref: swiperRef,
                        spaceBetween: 10,
                        slidesPerView: 1,
                        breakpoints: null,
                        // effect: "fade",
                        // fadeEffect: { crossFade: true }, //Note that crossFade should be set to true in order to avoid seeing content behind or underneath.
                    }}
                    callback={(e) => (globalIndex = e.activeIndex)}
                />
            </div>
        </div>
    );
}
