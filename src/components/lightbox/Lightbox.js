// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import localData from "../../localData";
// import useLock from "../../hooks/useLock";
// import { v4 as uuidv4 } from "uuid";
// import {Button} from '../'

// function Gallery({ items, handleOpen, setActive }) {
//     const handleClick = (index) => {
//         handleOpen();
//         setActive(index);
//     };
//     return (
//         <div className="gallery">
//             {!items || !items.length
//                 ? "loading..."
//                 : items.map((item, index) => {
//                       return (
//                           <img key={uuidv4()} width={300} src={item.image} alt="" onClick={() => handleClick(index)} />
//                       );
//                   })}
//         </div>
//     );
// }

// Gallery.propTypes = {
//     handleOpen: PropTypes.func.isRequired,
//     setActive: PropTypes.func.isRequired,
// };

// let indicator = 0;
// let timeout = null
// export default function Lightbox({ items }) {
//     const [open, setOpen] = useState(false);
//     const [isShown, setIsShown] = useState(false);
//     const [isContentShown, setIsContentShown] = useState(true);
//     const [active, setActive] = useState(null);
//     const [imageSrc, setImageSrc] = useState(null);
//     const [videoSrc, setVideoSrc] = useState(null);

//     const { lockScroll, unlockScroll } = useLock();
//     const { angleLeft, angleRight } = localData.svgs;

//     const showLightbox = () => setIsShown(true);
//     const hideLightbox = () => setIsShown(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };
//     const handleClose = () => {
//         setOpen(false);
//     };

//     useEffect(() => {
//         if (!open) return unlockScroll();
//         lockScroll();
//         showLightbox();
//     }, [open]);

//     const handleClick = (int) => {
//         indicator = int;
//         setIsContentShown(false);
//         // clearTimeout(timeout)
//         timeout = setTimeout(()=>{
//             setIsContentShown(true)
//         },300)
//     };

//     useEffect(() => {
//         if (!isContentShown) return;
//         setActive((prev) => {
//             prev += indicator;
//             if (prev > items.length - 1) {
//                 prev = 0;
//             } else if (prev < 0) {
//                 prev = items.length - 1;
//             }
//             return prev;
//         });
//     }, [isContentShown]);

//     useEffect(() => {
//         if (active === null) return;
//         setImageSrc(items[active].image);
//         setVideoSrc(items[active].video);
//     }, [active]);

//     // KEYDOWN
//     const handleKeydown = (e) => {
//         if (!document.querySelector(".lightbox.show")) return;
//         switch (e.key) {
//             case "ArrowLeft":
//                 handleClick(-1);
//                 break;
//             case "ArrowRight":
//                 handleClick(+1);
//                 break;
//             case "Escape":
//                 hideLightbox();
//                 break;
//         }
//     };

//     useEffect(() => document.addEventListener("keydown", handleKeydown), []);

//     return (
//         <>
//             <Gallery {...{ items, handleOpen, setActive }} />
//             {open && (
//                 <div
//                     className={`lightbox fade ${isShown ? "show" : ""}`}
//                     onClick={hideLightbox}
//                     onTransitionEnd={() => !isShown && handleClose()}
//                 >
//                     <div onTransitionEnd={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
//                         <div className="lightbox-arrows">
//                             <Button className="prev btn btn-circle-light" onClick={() => handleClick(-1)}>
//                                 {angleLeft}
//                             </Button>
//                             <Button className="next btn btn-circle-light" onClick={() => handleClick(+1)}>
//                                 {angleRight}
//                             </Button>
//                         </div>
//                         <div
//                             className={`lightbox-content ${isContentShown ? "show" : ""}`}
//                             // onTransitionEnd={() => setIsContentShown(true)}
//                         >
//                             <div className="wrapper">
//                                 {imageSrc && <img className="cover image-cover" src={imageSrc} alt="" />}
//                                 {videoSrc && <video className="cover video-cover" src={videoSrc} controls></video>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
