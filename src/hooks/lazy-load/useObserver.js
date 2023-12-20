import React, { useEffect, useRef } from "react";

export function useObserver(options = { rootMargin: window.innerWidth > 768 ? "-300px" : '0px', threshold: 0 }) {
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const ref = useRef(null);

    const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) observer.unobserve(ref.current);
        // if (entry.isIntersecting) observer.disconnect();
    }, options);

    useEffect(() => observer.observe(ref.current), []);

    return { ref, inView: isIntersecting };
}
