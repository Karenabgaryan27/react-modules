import React, { useState, useEffect, useRef } from "react";
import { Button, Carousel } from "../";

function TabTitleItem({ index, title, activeTab, setActiveTab, activeTabRef }) {
    return (
        <li key={index} className="nav-item" ref={activeTab === index ? activeTabRef : null}>
            <Button
                variant="text"
                className={`nav-link ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
                name={title}
            />
        </li>
    );
}

export default function Tabs({ tabs, defaultTab = 0, className, swiper }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const [isShown, setIsShown] = useState(defaultTab);
    const [style, setStyle] = useState(null);
    const activeTabRef = useRef(null);

    useEffect(() => {
        setIsShown(activeTab);
        setStyle({
            ...style,
            width: activeTabRef.current.offsetWidth + "px",
            left: activeTabRef.current.offsetLeft + "px",
        });
    }, [activeTab]);

    return (
        <div className={`tabs ${className} ${swiper ? "swiper-tabs" : ""}`}>
            <ul className="nav nav-tabs">
                {swiper ? (
                    <Carousel
                        items={tabs}
                        Card={TabTitleItem}
                        cardOptions={{ activeTab, setActiveTab, activeTabRef }}
                        options={{
                            slidesPerView: "auto",
                            spaceBetween: 0,
                            breakpoints: null,
                        }}
                    />
                ) : (
                    tabs.map((item, index) => (
                        <TabTitleItem
                            key={index}
                            {...{ ...item, index, activeTab, setActiveTab, activeTabRef }}
                        />
                    ))
                )}

                {!swiper && <div className="indicator" style={style}></div>}

                {/* OLD VERSION */}
                {/* {tabs.map(({ title }, index) => ( 
                    <li key={index} className="nav-item" ref={activeTab === index ? activeTabRef : null}>
                        <Button
                            variant="text"
                            color="primary"
                            className={`nav-link ${activeTab === index ? "active" : ""}`}
                            onClick={() => setActiveTab(index)}
                            name={title}
                        />
                    </li>
                ))} */}
            </ul>
            <div className="tab-content">
                {tabs.map(({ content }, index) => (
                    <div
                        key={index}
                        className={`tab-pane fade ${isShown === index ? "show" : ""} ${
                            activeTab === index ? "active" : ""
                        }`}
                    >
                        {/* {Verify whether the content is HTML to enable it to receive callbacks from the parent} */}
                        {React.isValidElement(content)
                            ? React.cloneElement(content, { setActiveTab })
                            : content}
                    </div>
                ))}
            </div>
        </div>
    );
}
