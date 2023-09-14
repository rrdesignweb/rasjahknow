import { useState, useRef } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const LightboxGallery = () => {
    const [open, setOpen] = useState(false);

    const [imageIndex, setImageIndex] = useState(-1);

    const onOpenImage = (i) => {
        setOpen(true)
        setImageIndex(i)
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img
                            onClick={() => onOpenImage(0)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-1.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(1)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-2.jpeg"
                            alt=""
                        />
                    </div>
                    <div>
                        <img
                            onClick={() => onOpenImage(2)}
                            className="h-auto max-w-full rounded-lg"
                            src="/carousel-3.jpeg"
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <Lightbox
                index={imageIndex}
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: "/carousel-1.jpeg" }, { src: "/carousel-2.jpeg" }, { src: "/carousel-3.jpeg" }]}
            />
        </>
    );
}

export default LightboxGallery;