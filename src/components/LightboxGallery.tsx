import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

interface IFilters {
    albums: any[];
    selectedAlbum: number;
    clickHandler: (value: string, index: number) => void;
}
interface ILightboxGalleryProps {
    data: any;
}

const LightboxGalleryFilters: React.FC<IFilters> = ({
  albums,
  selectedAlbum,
  clickHandler,
}: IFilters) => {
  const handleAlbumOnClick = (e: any, index: number) => {
    clickHandler(e.target.value, index);
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
                  onChange={(e: any) => handleAlbumOnClick(e, i)}
                  checked={selectedAlbum === i}
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
    const [isLoading, setIsLoading] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [albums, setAlbums] = useState<any[]>([]);
    const [lightboxImages, setLightboxImages] = useState<any[]>([]);
    const [selectedAlbum, setSelectedAlbum] = useState<number>(0);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const [masonaryCols, setMasonaryCols] = useState<any[]>([]);
    let imageIndexCount: number = -1;
    let _delay = 750;
    let wrappedCols: any = [];

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper to get image name from Contentful entry
    const getImageName = (item: any): string => {
        return item.fields?.name || item.fields?.title || item.fields?.image?.fields?.title || '';
    };

    let images = data && data.map((item: any) => {
        const albumName = item.fields?.album || '';
        const imageName = getImageName(item);
        
        return {
            src: (item.fields?.image?.sys?.id && item.fields?.image?.fields?.file?.url) ? 
                (item.fields.image.fields.file.url.startsWith('//') ? 'https:' + item.fields.image.fields.file.url : item.fields.image.fields.file.url) + '?fm=avif' : '',
            alt: item.fields?.image?.fields?.file?.title || '',
            imageName: imageName, // Store image name separately
            album: albumName, // Keep album separate for filtering
        };
    }).filter((image: any) => image.src && image.album && image.album.trim() !== ''); // Filter out items without valid URLs or album names

    // Get album from URL query param
    const getAlbumFromUrl = (): string | null => {
        if (typeof window === 'undefined') return null;
        const params = new URLSearchParams(window.location.search);
        return params.get('album');
    };

    // Update URL with album query param
    const updateUrlWithAlbum = (albumName: string) => {
        if (typeof window === 'undefined') return;
        const url = new URL(window.location.href);
        url.searchParams.set('album', albumName);
        window.history.replaceState({}, '', url.toString());
    };

    useEffect(() => {
        const albumCategories: any[] = [];
        data && data.slice(0).reverse().map((item: any, i: number) => {
            // Only add non-empty album names
            if (item.fields?.album && item.fields.album.trim() !== '') {
                albumCategories.push(item.fields.album)
            }
        });

        const uniq = albumCategories.reduce(function (a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);

        setAlbums([].concat.apply([], uniq));
        setLightboxImages(images)

    }, [])

    useEffect(() => {
        if (albums.length === 0) return;
        
        setTimeout(() => {
            const urlAlbum = getAlbumFromUrl();
            
            if (urlAlbum) {
                // Find the index of the album from URL
                const albumIndex = albums.findIndex((album: string) => album === urlAlbum);
                if (albumIndex !== -1) {
                    setSelectedAlbum(albumIndex);
                    filterAlbumImages(urlAlbum);
                    return;
                }
            }
            
            // Default to first album if no valid query param
            setSelectedAlbum(0);
            filterAlbumImages(albums[0]);
            updateUrlWithAlbum(albums[0]);
        }, _delay)
    }, [albums])

    useEffect(() => {
    }, [lightboxImages, masonaryCols])

    const filterAlbumImages = (value: string) => {
        imageIndexCount = -1;
        const newImages = images.filter((item: any, i: number) => {
            return item.album === value
        }).map((item: any) => ({
            ...item,
            // Set title based on screen size - image name only on mobile, full title on desktop
            title: isMobile 
                ? (item.imageName || item.album)
                : (item.imageName ? `${item.album} - ${item.imageName}` : item.album)
        }))

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

        // Start fade out of skeleton
        setIsFadingOut(true);
        
        // After fade out completes, show the images
        setTimeout(() => {
            setMasonaryCols(wrappedCols);
            setLightboxImages(newImages);
            setIsLoading(false);
            setIsFadingOut(false);
        }, 300); // Match the CSS transition duration
    }

    const populateImage = (listTriple: any[]) => {
        const template = listTriple && listTriple.map((item: any, i: number) => {
            imageIndexCount = imageIndexCount + 1

            return (
                <div key={uuidv4()} className="image aspect-[4/3] md:aspect-auto md:h-full" >
                    <img
                        className="w-full h-full rounded-lg hover:cursor-pointer object-cover"
                        src={item.src}
                        alt={item.alt ? item.alt : item.album}
                        data-index={imageIndexCount}
                        data-album={item.album}
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

    const handleSetSelectedCategory = (value: string, index: number) => {
        setSelectedAlbum(index);
        updateUrlWithAlbum(value);
        
        // Start fade out, then show skeleton, then load new images
        setIsFadingOut(true);
        setTimeout(() => {
            setMasonaryCols([]);
            setLightboxImages([]);
            setIsLoading(true);
            setIsFadingOut(false);
            setTimeout(() => {
                filterAlbumImages(value);
            }, _delay);
        }, 300); // Match the CSS transition duration
    }

    return (
        <>
            <LightboxGalleryFilters albums={albums} selectedAlbum={selectedAlbum} clickHandler={handleSetSelectedCategory} />
            <div className="relative min-h-[400px]">
                {/* Skeleton loader */}
                <div 
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ${
                        isLoading && !isFadingOut ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    } ${!isLoading ? 'absolute inset-0' : ''}`}
                >
                    {[...Array(isMobile ? 4 : 3)].map((_, colIndex) => (
                        <div key={colIndex} className="grid gap-4">
                            {[...Array(isMobile ? 1 : 3)].map((_, rowIndex) => (
                                <div 
                                    key={rowIndex} 
                                    className="rounded-lg overflow-hidden aspect-[4/3] md:aspect-auto"
                                    style={{ 
                                        height: isMobile ? 'auto' : `${200 + ((colIndex + rowIndex) % 3) * 80}px`,
                                        background: 'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 1.5s infinite ease-in-out',
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <style>{`
                    @keyframes shimmer {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                `}</style>
                
                {/* Actual gallery content */}
                <div 
                    className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-300 ${
                        !isLoading && !isFadingOut ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {masonaryCols}
                </div>
            </div>
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