import React, { useState, useEffect } from "react";
import { Header,  Breadcrumbs, Footer } from "../../components";
import { useParams, Link as RouterLink } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useGlobalContext } from "../../context";
import { motion } from "framer-motion";
import localData from "../../localData";

export default function Product() {
    const { pageFade } = useGlobalContext().animations;

    const params = useParams();

    const [product, setProduct] = useState({});

    const { getProduct } = useFetch();

    const {productsIcon}  = localData.svgs

    useEffect(() => {
        getProduct((err, data) => setProduct(data), params.productId);
    }, []);

    return (
        <>
            <Header title="product">
            <Breadcrumbs
                    items={[
                        { name: "products", icon: productsIcon, href: '/products'},
                        { name: "product"},
                    ]}
                />
            </Header>
            <motion.main {...pageFade} className="product-page">
                <section className="example">
                    <div className="container">
                        <h2 className="example-title display-2">example</h2>
                        <p className="example-description">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eius et consequatur eaque
                            recusandae ipsa quae harum, illo quidem cum quos ratione blanditiis iure sequi vero nam odit
                            dolor rerum? Quam itaque harum molestias explicabo suscipit quas voluptates maiores
                            mollitia.
                        </p>
                        <h3>id: "{params.productId}"</h3>
                        <img src={product?.url} alt="" />
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
