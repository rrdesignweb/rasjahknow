import { useEffect, useState } from 'react';

interface InstagramResponse {
  data: InstagramMedia[];
  // Add more properties based on the actual structure of your response
}

interface InstagramMedia {
  media_type: string;
  permalink: string;
  media_url?: string;
  thumbnail_url?: string;
  // Add more properties as needed
}

const Instagram = () => {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions: RequestInit = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("https://v1.nocodeapi.com/roshambo/instagram/IwFRjheBjJPUkvhF?limit=10", requestOptions)
        .then(response => response.json())
        .then((result: InstagramResponse) => {
          setResult(result);
          console.log(result.data.length) // Assuming setResult is typed to accept InstagramResponse or a similar structure
        })
        .catch(error => console.log('error', error));
    };
    fetchData();
  }, []);

  return (
    <section>
      <h2 className="font-semibold uppercase text-2xl mb-6 text-white">
        FOLLOW <a
          href="https://www.instagram.com/rasjahknow/"
          className="hover:underline"
          target="_blank" rel="noopener noreferrer">@RASJAHKNOW</a>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 gap-1">
        {result && result.data ? (
          result.data.map((item: any, i: number) => {
            if (item.media_type === "IMAGE") {
              return (
                <a href={item.permalink} data-media-type="image" target="_blank" rel="noopener noreferrer" key={i}>
                  <div className="relative w-full md:h-60 sm:h-48 h-80 ">
                    <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 hover:bg-gray-900 hover:bg-opacity-50" />
                    <img
                      className="object-cover w-full h-full"
                      src={item.media_url}
                      alt="..."
                    />
                  </div>
                </a>
              );
            }
            if (item.media_type === "VIDEO") {
              return (
                <a href={item.permalink} data-media-type="video" target="_blank" rel="noopener noreferrer" key={i}>
                  <div className="relative w-full md:h-60 sm:h-48 h-80 ">
                    <div className="absolute left-0 bottom-0 top-0 right-0 z-30 flex justify-center items-center flex-col hover:bg-gray-900 hover:bg-opacity-50">
                      <span className="sr-only">Watch the video</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 8.64v6.72L15.27 12L10 8.64z" />
                        <path d="M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9zm-18 0c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9-9-4.03-9-9z" />
                      </svg>
                    </div>
                    <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 z-10" />
                    <img
                      className="object-cover w-full h-full"
                      src={item.thumbnail_url}
                      alt="..."
                    />
                  </div>
                </a>
              );
            }
            return null;
          })
        ) : (
          [...Array(6)].map((_, i) => (
            <div key={i}>
              <a href="#" title="Blank Href">
                <div
                  className="relative w-full md:h-60 sm:h-48 h-80"
                  style={{
                    animation: 'shadingAnimation 2s infinite',
                    background: 'black',
                    opacity: '0.3',
                  }}
                >
                  <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0" />
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </section >
  );
};

export default Instagram;