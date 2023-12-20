import React from 'react'
import useParallaxEffect from '../../../hooks/useParallaxEffect';

export default function JSWindowCard({ title, description, cover, className = "" }) {
    const { start, end, move } = useParallaxEffect({
        // axisDepth: 25,
        reverse: true,
        glare: true,
        // imageReverse: true
        speed: 500,
        imageSpeed: 100,
    });
    return (
        <div className={`card js-window-card ${className}`} onMouseMove={move} onMouseLeave={end} onMouseEnter={start}>
            <div className="card-inner" data-parallax-inner>
                <div className="card-cover">
                    <div className="card-cover-inner" data-parallax-image>
                        <img src={cover} alt="" />
                    </div>
                </div>
                <div className="wrapper">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-description">{description}</p>
                </div>
            </div>
        </div>
    );
}
