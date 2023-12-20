import React, { useEffect, useState } from "react";
import { Header, Breadcrumbs,Footer } from "../../components";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { motion } from "framer-motion";
import localData from "../../localData";

export default function Products() {
    const { pageFade } = useGlobalContext().animations;

    // FETCH
    const [products, setProducts] = useState({});
    const { getProducts } = useFetch();

    useEffect(() => {
        getProducts((err, data) => setProducts(data));
    }, []);

    //

    const {productsIcon} = localData.svgs

    return (
        <>
            <Header title="products">
            <Breadcrumbs
                    items={[
                        { name: "products", icon: productsIcon},
                    ]}
                />
            </Header>
            <motion.main {...pageFade} className="products-page">
                <section className="example">
                    <div className="container">
                        <h2 className="example-title display-2">example</h2>
                        <p className="example-description mb-5">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi eius et consequatur eaque
                            recusandae ipsa quae harum, illo quidem cum quos ratione blanditiis iure sequi vero nam odit
                            dolor rerum? Quam itaque harum molestias explicabo suscipit quas voluptates maiores
                            mollitia.
                        </p>
                        <div className="wrapper" data-lazy-block>
                            {!products || !Object.entries(products).length
                                ? "loading..."
                                : products.map((product) => {
                                      return (
                                          <Link key={product.id} to={`/products/${product.id}`}>
                                              <img src={product.thumbnailUrl} alt={product.title} />
                                          </Link>
                                      );
                                  })}
                        </div>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
