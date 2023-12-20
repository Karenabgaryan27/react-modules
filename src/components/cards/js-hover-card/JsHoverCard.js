import React from 'react'
import useParallaxEffect from '../../../hooks/useParallaxEffect';

export default function JSHoverCard({ title, description, image, className = "", reverse, glare, maxGlare }) {
    const { start, end, move } = useParallaxEffect({
        // axisDepth: 25,
        reverse,
        glare,
        maxGlare,
    });
    return (
        <div className={`card js-hover-card ${className}`} onMouseMove={move} onMouseLeave={end} onMouseEnter={start}>
            <div className="card-inner" data-parallax-inner>
                <h4 className="card-title">{title}</h4>
                <p className="card-description">{description}</p>
                <img className="card-image" src={image} alt="" />
            </div>
        </div>
    );
}
