import React, { useState, useEffect } from "react";
import { Header, Button, Carousel, ProductCard, Breadcrumbs,Footer } from "../../components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../context";
import localData from "../../localData";
import useFetch from "../../hooks/useFetch";

function AboutSection() {
    const { angleRight } = localData.svgs;

    return (
        <section className="about">
            <div className="container ">
                <h2 className={`about-title display-2`}>about title</h2>
                <p className="about-description mb-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis eaque, sapiente quasi
                    facere, exercitationem ipsam voluptate repudiandae a magnam praesentium sit rem pariatur ad ullam
                    sunt ipsa. Adipisci blanditiis voluptas minima tenetur rerum debitis quo velit consequuntur earum
                    reprehenderit!
                </p>

                <Link to="/about">
                    <Button variant="contained"  endIcon={angleRight} name='go to about page'/>
                </Link>
            </div>
        </section>
    );
}

function ProductsSection() {
    // FETCH
    const [products, setProducts] = useState([]);
    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => {
            setProducts(data);
        });
    }, []);
    //

    const { angleRight } = localData.svgs;

    return (
        <section className="products">
            <div className="container ">
                <h2 className="products-title display-2">products</h2>
                <p className="products-description mb-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis eaque, sapiente quasi
                    facere, exercitationem ipsam voluptate repudiandae a magnam praesentium sit rem pariatur ad ullam
                    sunt ipsa. Adipisci blanditiis voluptas minima tenetur rerum debitis quo velit consequuntur earum
                    reprehenderit!
                </p>
                <Carousel items={products} Card={ProductCard} />
                <br />
                <Link to="/products">
                    <Button variant="contained" endIcon={angleRight}>
                        go to products page
                    </Button>
                </Link>
            </div>
        </section>
    );
}

export default function Home() {
    const { pageFade } = useGlobalContext().animations;

    useEffect(() => {
        document.title = "home";
    }, []);

    const { angleRight, home, products } = localData.svgs;

    return (
        <>
            <Header title="home"/>
            <motion.main className="home-page" {...pageFade}>
                <AboutSection />
                <ProductsSection />

                <Link to={"/error"}>
                    <Button variant="contained" color="danger">go to error page</Button>
                </Link>
            </motion.main>
            <Footer/>
        </>
    );
}
