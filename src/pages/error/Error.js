import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import { useParams, useNavigate } from "react-router-dom";
import localData from "../../localData";
import { motion } from "framer-motion";
import { Button } from "../../components";

export default function Error() {
    const { angleLeft } = localData.svgs;
    const [data, setData] = useState({});

    const { error } = useGlobalContext().localData;
    const { pageFade } = useGlobalContext().animations;

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const { message, cover } = error[params?.["*"]] || error["not-found"];
        setData({ message, cover });
    }, []);

    if (!data || !Object.entries(data).length) return "loading...";
    return (
        <motion.main className="error-page" {...pageFade}>
            <section className="error">
                <div className="container">
                    <Button
                        variant="contained"
                        name="return"
                        color="dark"
                        className="rounded-pill"
                        onClick={() => navigate(-1)}
                    />
                    <div className="wrapper">
                        <div className="error-img">
                            <img src={data.cover} alt={data.cover} />
                        </div>
                    </div>
                    <h2 className="error-title">{data.message}</h2>
                </div>
            </section>
        </motion.main>
    );
}
