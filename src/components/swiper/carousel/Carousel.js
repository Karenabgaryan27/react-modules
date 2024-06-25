import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, EffectFade, Lazy, Autoplay } from "swiper";
import localData from "../../../localData";
import { v4 as uuidv4 } from "uuid";

const effects = {
    // code bellow currently not working because of swiper.js/react merging issues, exept fade effect
    fade: {
        effect: "fade",
        fadeEffect: { crossFade: true }, //Note that crossFade should be set to true in order to avoid seeing content behind or underneath when using different switching effects
    },
    flip: {
        effect: "flip",
        flipEffect: { slideShadows: false },
    },
    coverflow: {
        effect: "coverflow",
        coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
    },
    cube: {
        effect: "cube",
        cubeEffect: {
            slideShadows: false,
        },
    },
};

function CarouselCard() {
    return <div className="card carousel-card">Card component required</div>;
}

export default function Carousel({
    items,
    Card = CarouselCard,
    options = {},
    cardOptions = {},
    className = "",
    callback = () => {},
}) {
    const { preloader, angleLeft, angleRight } = localData.svgs;

    const navigationPrevRef = React.useRef(null);
    const navigationNextRef = React.useRef(null);

    // SwiperCore.use([ Lazy ])
    SwiperCore.use([Navigation, Pagination, EffectFade, Lazy, Autoplay]);

    // const [id,setId] = useState('')

    // useEffect(()=>{
    //     setId(uuidv4())
    // },[])

    return (
        <>
            {!items || !Object.keys(items).length ? (
                <img src={preloader} width="300" />
            ) : (
                <div className={`carousel ${className}`}>
                    <Swiper
                        // loop={true}
                        // onSwiper={(swiper) => console.log(swiper)}
                        // initialSlide={initialSlide}
                        // pagination={{ clickable: true }}
                        // scrollbar={{ draggable: true }}

                        touchStartPreventDefault={false}
                        modules={[Navigation, Pagination, EffectFade]}
                        spaceBetween={30}
                        slidesPerView={1}
                        onSlideChange={(e) => {
                            callback(e);
                            // console.log("slide change");
                        }}
                        // autoplay={{ delay: 3000, disableOnInteraction: false }}
                        // speed={1000}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                            // prevEl: document.querySelector(`prev-${id}`),
                            // nextEl: document.querySelector(`next-${id}`),
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                            // swiper.params.navigation.prevEl = document.querySelector(`prev-${id}`);
                            // swiper.params.navigation.nextEl = document.querySelector(`next-${id}`);
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            992: {
                                slidesPerView: 4,
                            },
                        }}
                        // {...effects.fade}
                        {...options}
                    >
                        {items.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Card {...{ ...item, ...cardOptions, index }} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                    <div className="carousel-angles">
                        <button
                            id={`prev-${uuidv4()}`}
                            className="carousel-angle prev btn btn-circle-dark"
                            color="primary"
                            ref={navigationPrevRef}
                        >
                            {angleLeft}
                        </button>
                        <button
                            id={`next-${uuidv4()}`}
                            className="carousel-angle next btn btn-circle-dark"
                            color="primary"
                            ref={navigationNextRef}
                        >
                            {angleRight}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
