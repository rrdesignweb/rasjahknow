import { useEffect, useState } from 'react';

const Instagram = () => {
  const [result, setResult] = useState<{ data: any[] } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v1.nocodeapi.com/roshambo/instagram/IwFRjheBjJPUkvhF?limit=6"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error("Failed to fetch Instagram data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2 className="font-semibold uppercase text-2xl mb-6 text-white">
        FOLLOW <a
          href="https://www.instagram.com/rasjahknow/"
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer">@RASJAHKNOW</a>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 gap-1">
        {result?.data?.length === 0 &&
          [...Array(6)].map((_: any, i: number) => (
            <div key={i}>
              <a href="#" title="Blank Href">
                <div
                  className="relative w-full md:h-60 sm:h-48 h-80"
                  style={{
                    animation: "shadingAnimation 2s infinite",
                    background: "black",
                    opacity: 0.5,
                  }}
                >
                  <div className="bg-gray-500 absolute w-full h-full left-0 bottom-0 top-0 right-0" />
                </div>
              </a>
            </div>
          ))
        }
        {
          result?.data ?
            result.data.map((item: any, i: number) =>
              item.media_type === "IMAGE" ? (
                <a
                  key={i}
                  href={item.permalink}
                  data-media-type="image"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full md:h-60 sm:h-48 h-80 ">
                    <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 hover:bg-gray-900 hover:bg-opacity-50" />
                    <img
                      className="object-cover w-full h-full"
                      src={item.media_url}
                      alt={item.caption}
                      loading="lazy"
                    />
                  </div>
                </a>
              ) : item.media_type === "VIDEO" ? (
                <a
                  key={i}
                  href={item.permalink}
                  data-media-type="video"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full md:h-60 sm:h-48 h-80 ">
                    <div className="absolute left-0 bottom-0 top-0 right-0 z-30 flex justify-center items-center flex-col hover:bg-gray-900 hover:bg-opacity-50">
                      <span className="sr-only">Watch the video</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-20 w-20 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M10 8.64v6.72L15.27 12L10 8.64z" />
                        <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9zm-18 0c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z" />
                      </svg>
                    </div>
                    <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 z-10" />
                    <img
                      className="object-cover w-full h-full"
                      src={item.thumbnail_url}
                      alt={item.caption}
                      loading="lazy"
                    />
                  </div>
                </a>
              ) : item.media_type === "CAROUSEL_ALBUM" ? (
                <a
                  key={i}
                  href={item.permalink}
                  data-media-type="carousel_item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-full md:h-60 sm:h-48 h-80">
                    <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 hover:bg-gray-900 hover:bg-opacity-50" />
                    <img
                      className="object-cover w-full h-full"
                      src={item.media_url}
                      alt={item.caption}
                      loading="lazy"
                    />
                  </div>
                </a>
              ) : null
            ) : (
              <div className="text-white">Loading...</div>
            )
        }
      </div>
    </section>
  );
};

export default Instagram;
