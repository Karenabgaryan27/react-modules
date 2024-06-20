import React, {useState,useRef,useEffect} from "react";
import ReactCrop, {
    centerCrop,
    convertToPercentCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import localData from "../../localData";
import useCrop from "../../hooks/useCrop";
import {Button} from '../../components'
import "react-image-crop/src/ReactCrop.scss";


const ASPECT_RATIO = 3 / 2;
const MIN_DIMENSTION = 150;
export default function ImageCrop() {
    const [crop, setCrop] = useState();
    const imageRef = useRef(null);
    const canvasRef = useRef(null);

    
    const { placeholder } = localData.images;

    
    const handleImageCrop = (e) => {
        const { width, height } = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: "%", // Can be 'px' or '%'
                width: width,
            },
            ASPECT_RATIO,
            width,
            height
        );

        const centeredCrop = centerCrop(crop, width, height);

        setCrop(centeredCrop);
    };

    const { setCanvasPreview } = useCrop();
    return (
        <div className="container">
            <div className="image-crop-header">
                <input type="file" />
            </div>
            <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => {
                    setCrop(percentCrop);
                }}
                // circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSTION}
            >
                <img
                    ref={imageRef}
                    className={`file-image`}
                    src={placeholder}
                    alt="Selected Image"
                    onLoad={(e) => handleImageCrop(e)}
                />
            </ReactCrop>

            <div className="image-crop-footer">
                {crop && (
                    <canvas
                        ref={canvasRef}
                        style={{
                             display: "block",
                            border: "1px solid",
                            width: "150px",
                            height: "150px",
                            objectFit: "contain",
                        }}
                    />
                )}
                <Button
                    variant="contained"
                    color="primary"
                    name="Crop Image"
                    onClick={async () => {
                        setCanvasPreview(
                            imageRef.current,
                            canvasRef.current,
                            convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height),
                        );
                        try {
                            console.log(imageRef.current.type);
                         
                        } catch (error) {
                            console.error("Error generating file from canvas:", error);
                        }
                  
                    }}
                />
            </div>
        </div>
    );
}

