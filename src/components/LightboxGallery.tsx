import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

interface IFilters {
    albums: any[];
    clickHandler: (e: any) => void;
}
interface ILightboxGalleryProps {
    data: any;
}

const LightboxGalleryFilters: React.FC<IFilters> = ({
  albums,
  clickHandler,
}: IFilters) => {
  const [selectedAlbum, setSelectedAlbum] = useState<number>(0); // Add state for selected album

  const handleAlbumOnClick = (e: any, index: number) => {
    setSelectedAlbum(index); // Update state on click
    clickHandler(e.target.value);
  };

  return (
    <div className="wrapper-class">
      <div className="mb-10 flex justify-center items-center">
        <label htmlFor="AlbumList" className="mr-6 hidden">
          Photo Albums:
        </label>
        <div id="AlbumList" className="flex flex-wrap gap-1 ">
          {albums &&
            albums.map((item: string, i: number) => (
              <label key={i} className="flex cursor-pointer">
                <input
                  type="radio"
                  name="album"
                  value={item}
                  className="hidden peer"
                  onChange={(e: any) => handleAlbumOnClick(e, i)} // Pass index to handler
                  checked={selectedAlbum === i} // Check based on state
                />
                <span className="text-base text-[#111111] py-3 px-4 border-0 bg-gray-200 rounded-lg peer-checked:bg-black peer-checked:text-white ">
                  {item}
                </span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

const LightboxGallery = ({ data }: ILightboxGalleryProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [imageIndex, setImageIndex] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);
    const [albums, setAlbums] = useState<any[]>([]);
    const [lightboxImages, setLightboxImages] = useState<any[]>([]);

    const [masonaryCols, setMasonaryCols] = useState<any[]>([]);
    let imageIndexCount: number = -1;
    let _delay = 750;
    let wrappedCols: any = [];

    let images = data && data.map((item: any) => ({
        src: item.fields?.image?.fields?.file?.url + '?fm=avif',
        alt: item.fields?.image?.fields?.file?.title,
        title: item.fields.album,
    }));

    useEffect(() => {
        const albumCategories: any[] = [];
        data && data.slice(0).reverse().map((item: any, i: number) => {
            albumCategories.push(item.fields?.album)
        });

        const uniq = albumCategories.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);

        setAlbums([].concat.apply([], uniq));
        setLightboxImages(images)

    }, [])

    useEffect(() => {
        setTimeout(() => {
            albums && albums.find((item: string, i: number) => {
                return (
                    i === 0 && filterAlbumImages(item)
                )
            })
        }, _delay)
    }, [albums])

    useEffect(() => {
    }, [lightboxImages, masonaryCols])

    const filterAlbumImages = (value: string) => {
        imageIndexCount = -1;
        const newImages = images.filter((item: any, i: number) => {
            return item.title === value
        })

        let listTriple: any[] = []; // the temporary array

        newImages.forEach((item: any, i: number) => {
            listTriple.push(item);
            if (listTriple.length === 3) {
                let slides = populateImage(listTriple);
                listTriple = []; // reset the temp array
            }
        });

        if (listTriple.length) {
            populateImage(listTriple);
        }

        setMasonaryCols(wrappedCols)
        setLightboxImages(newImages);

    }

    const populateImage = (listTriple: any[]) => {
        const template = listTriple && listTriple.map((item: any, i: number) => {
            imageIndexCount = imageIndexCount + 1

            return (
                <div key={uuidv4()} className="h-full image" >
                    <img
                        className="max-w-full rounded-lg hover:cursor-pointer object-cover h-full"
                        src={item.src}
                        alt={item.alt ? item.alt : item.title}
                        data-index={imageIndexCount}
                        data-album={item.title}
                        onClick={(e) => onOpenImage(e)}
                        loading="lazy"
                    />
                </div>
            )
        })

        wrappedCols.push(
            <div key={uuidv4()} className="grid gap-4" >
                {template}
            </div>
        )
    };

    const onOpenImage = (e: any) => {
        setOpen(true)
        let et = e.currentTarget;
        let dataIndex = parseInt(et.getAttribute("data-index"));
        setImageIndex(dataIndex)
    }

    const handleSetSelectedCategory = (value: string) => {
        setMasonaryCols([]);
        setLightboxImages([]);
        setTimeout(() => {
            filterAlbumImages(value);
        }, _delay);
    }

    return (
        <>
            <LightboxGalleryFilters albums={albums} clickHandler={handleSetSelectedCategory} />
            {!masonaryCols || masonaryCols.length === 0 ? (
                <div className="w-full mb-32 flex justify-center">
                    <img src="/spinner.svg" alt="Spinner" loading="lazy" />
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-4">
                    {masonaryCols}
                </div>
            )}
            <Lightbox
                index={imageIndex}
                open={open}
                close={() => setOpen(false)}
                plugins={[Captions]}
                slides={lightboxImages}
            />
        </>
    );
}

export default LightboxGallery;