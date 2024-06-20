import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header, Footer } from "../../../components";
import Pagination from "@mui/material/Pagination";
import useFetch from "../../../hooks/useFetch";

function PaginationSection() {
    return (
        <section>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                <h2 className="display-2">pagination</h2>
                <Pagination count={40} color="primary" />
                <Pagination count={10} variant="outlined" />
                <Pagination count={10} shape="rounded" />
                <Pagination count={10} variant="outlined" shape="rounded" />
                <Pagination count={10} size="small" />
                <Pagination count={10} />
                <Pagination count={10} size="large" />
            </div>
        </section>
    );
}

function PaginationWithItemsSection() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(3);
    const [tempCurrentPage, setTempCurrentPage] = useState(null);
    const [currentPageItems, setCurrentPageItems] = useState([]);
    const [itemPerPage] = useState(10);
    const { getPhotos } = useFetch();

    const fetchItems = async () => {
        setIsLoading(true);
        const tempPhotos = await getPhotos();
        setItems(tempPhotos);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const getCurrentPageItems = () => {
        const indexOfLastItem = currentPage * itemPerPage;
        const indexOfFirstItem = indexOfLastItem - itemPerPage;
        const currentPageItems = items.slice(indexOfFirstItem, indexOfLastItem);
        return currentPageItems;
    };

    useEffect(() => {
        setCurrentPageItems(getCurrentPageItems());
        setTempCurrentPage(null);
    }, [items, currentPage]);

    return (
        <section>
            <div className="container">
                <h2 className="display-2">pagination with items</h2>
                <div
                    className={`card-group photo-card-group ${tempCurrentPage ? "hide" : ""}`}
                    onTransitionEnd={() => tempCurrentPage && setCurrentPage(tempCurrentPage)}
                >
                    {isLoading
                        ? "loading..."
                        : currentPageItems.map((item, index) => {
                              return (
                                  <div className="card photo-card" key={index}>
                                      <div className="card-id">{item.id}</div>
                                      <img src={item.url} alt="" />
                                      <div className="card-title">{item.title}</div>
                                  </div>
                              );
                          })}
                </div>
                <Pagination
                    count={Math.ceil(items.length / itemPerPage)}
                    page={currentPage}
                    // defaultPage={3}
                    boundaryCount={2}
                    onChange={(e, value) => value !== currentPage && setTempCurrentPage(value)}
                />
            </div>
        </section>
    );
}

export default function PaginationPage() {
    const { pageFade } = useGlobalContext().animations;

    return (
        <>
            <Header title="pagination" />
            <motion.main {...pageFade} className="pagination-page">
                <PaginationSection />
                <PaginationWithItemsSection />
            </motion.main>
            <Footer />
        </>
    );
}
