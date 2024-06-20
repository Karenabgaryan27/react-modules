import React, { lazy, Suspense } from "react";
import {
    Home,
    About,
    Products,
    Product,
    Error,
    RestPage,
    ButtonPage,
    PopupPage,
    FormPage,
    ProgressPage,
    CarouselPage,
    LazyLoadPage,
    SendEmailPage,
    ParallaxScrollPage,
    ParallaxEffectPage,
    ResponsivnessPage,
    PaginationPage,
    DragAndDropPage,
    ChatPage
} from "./pages";
import { Route, Routes,useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// const About = lazy(()=> import('./pages/about/About.js')) // to make About page as a separate bundle for better performance

// const pages = ["/", "/about"]; // to avoid navbar fading while swithching page

export default function App() {
    const location = useLocation();

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         // top: 500,
    //         behavior: "smooth",
    //         // behavior: "auto",
    //     });
    // }, [location.pathname]);

    return (
        <>
            {/* to avoid navbar fading while swithching page */}
            {/* {pages.includes(location.pathname) && <Navbar />} */}
            
            <AnimatePresence exitBeforeEnter>
                {/* <Suspense> */}
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:productId" element={<Product />} />
                    <Route path="/modules/button" element={<ButtonPage />} />
                    <Route path="/modules/popup" element={<PopupPage />} />
                    <Route path="/modules/form" element={<FormPage />} />
                    <Route path="/modules/progress" element={<ProgressPage />} />
                    <Route path="/modules/carousel" element={<CarouselPage />} />
                    <Route path="/modules/pagination" element={<PaginationPage />} />
                    <Route path="/modules/drag-and-drop" element={<DragAndDropPage />} />
                    <Route path="/helpers/send-email" element={<SendEmailPage />} />
                    <Route path="/helpers/lazy-load" element={<LazyLoadPage />} />
                    <Route path="/helpers/parallax-scroll" element={<ParallaxScrollPage />} />
                    <Route path="/helpers/parallax-effect" element={<ParallaxEffectPage />} />
                    <Route path="/helpers/responsivness" element={<ResponsivnessPage />} />
                    <Route path="/modules/chat" element={<ChatPage />} />
                    <Route path="/modules/rest" element={<RestPage />} />

                    <Route path="*" element={<Error />} />
                </Routes>
                {/* </Suspense> */}
                
            </AnimatePresence>
        </>
    );
}
