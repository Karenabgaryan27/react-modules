import React from 'react'
import { motion,  useTransform, useMotionValue } from "framer-motion";

export default function FramerDraggableCard({ title, description, image, className = "" }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);
    return (
        <motion.div
            className={`card framer-draggable-card ${className}`}
            style={{ x, y, rotateX, rotateY, z: 100 }}
            drag
            dragElastic={0.16}
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            whileTap={{ cursor: "grabbing", zIndex: 1 }}
        >
            <h4 className="card-title">{title}</h4>
            <p className="card-description">{description}</p>
            <motion.img className="card-image" src={image} alt="" style={{ x, y, rotateX, rotateY, z: 10000 }} />
        </motion.div>
    );
}
