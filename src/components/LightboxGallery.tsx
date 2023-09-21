import { useState, useRef, createRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import { v4 as uuidv4 } from "uuid";
import "yet-another-react-lightbox/styles.css";
import type { GalleryItem } from "../lib/types";

interface LightboxGalleryProps {
    data: any
}

const LightboxGallery = ({ data }: LightboxGalleryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>();
    const [list] = useState(data);
    //const imageRef = useRef([...new Array(list.length)].map(() => undefined));
    let masonaryCols: any[] = [];
    let imageIndexCount: number = -1;
    const images = data.map((item: any) => ({ ["src"]: item.fields.image.fields.file?.url }));

    const populateImage = (listTriple: any[]) => {
        const template = listTriple && listTriple.map((item: any, i: number) => {
            imageIndexCount = imageIndexCount + 1

            return (
                <div key={uuidv4()} className="h-full" >
                    <img
                        className="max-w-full rounded-lg hover:cursor-pointer object-cover h-full"
                        src={item.fields.image?.fields.file?.url}
                        alt={item.fields.image?.fields.file?.title}
                        data-index={imageIndexCount}
                        onClick={(e) => onOpenImage(e, i)}
                    />
                </div>
            )
        })

        masonaryCols.push(
            <div key={uuidv4()} className="grid gap-4" >
                {template}
            </div>
        )
    };

    let listTriple: any[] = []; // the temporary array

    list.forEach((item: any, i: number) => {
        listTriple.push(item);
        if (listTriple.length === 3) {
            let slides = populateImage(listTriple);
            listTriple = []; // reset the temp array
        }
    });

    // there may still be cards available
    if (listTriple.length) {
        populateImage(listTriple);
    }

    const onOpenImage = (e: any, i: any) => {
        setOpen(true)
        let et = e.currentTarget;
        let dataIndex = parseInt(et.getAttribute("data-index"));
        setImageIndex(dataIndex)
    }

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {masonaryCols}
            </div>
            <Lightbox
                index={imageIndex}
                open={open}
                close={() => setOpen(false)}
                slides={images}
            />
        </>
    );
}

export default LightboxGallery;