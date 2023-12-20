import React from "react";
import { motion } from "framer-motion";
import { useGlobalContext } from "../../../context";
import { Header, Button ,Footer} from "../../../components";
import localData from "../../../localData";

export default function ButtonPage() {
    const { pageFade } = useGlobalContext().animations;
    const { trash } = localData.svgs;
    return (
        <>
            <Header title="button" />
            <motion.main {...pageFade} className="button-page">
                <section id="button">
                    <div className="container">
                        <h2 className="display-2">type, color, size</h2>
                        <div className="btns-group">
                            <div style={{ marginBottom: "10px" }}>
                                <Button name="default" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <Button variant="text" color="secondary" name="secondary" size="sm" />
                                <Button variant="text" color="primary" name="primary" size="md" />
                                <Button variant="text" color="success" name="success" size="lg" />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <Button variant="outlined" color="secondary" name="secondary" size="sm" />
                                <Button variant="outlined" color="primary" name="primary" size="md" />
                                <Button variant="outlined" color="success" name="success" size="lg" />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <Button variant="contained" color="secondary" name="secondary" size="sm" />
                                <Button variant="contained" color="primary" name="primary" size="md" />
                                <Button variant="contained" name="success" size="lg" />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    name="secondary"
                                    size="sm"
                                    endIcon={trash}
                                />
                                <Button variant="contained" color="primary" name="primary" size="md" endIcon={trash} />
                                <Button variant="contained" color="success" name="success" size="lg" endIcon={trash} />
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                            <Button variant="circle" color="secondary" icon={trash} size="sm"  />
                            <Button variant="circle" color="primary" icon={trash} size="md"  />
                            <Button variant="circle" color="success" icon={trash} size="lg"  />
                             
                                {/* <Button className="btn-circle-secondary btn-circle-sm " icon={trash} />
                                <Button className="btn-circle-secondary btn-circle-sm ">{trash}</Button>
                                <Button className="btn-circle-primary ">{trash}</Button>
                                <Button className="btn-circle-success btn-circle-lg ">{trash}</Button> */}
                            </div>
                        </div>
                    </div>
                </section>
            </motion.main>
            <Footer/>
        </>
    );
}
