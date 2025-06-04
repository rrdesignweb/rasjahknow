import { useEffect, useState } from "react";
import instagramData from "../instagram.json";

interface InstagramResponse {
  data: InstagramPost[];
}

interface InstagramPost {
  id: number;
  image: string;
  link: string;
  video: boolean;
  description: string;
}

export const instagramPosts: InstagramPost[] = [
  {
    id: 1,
    image: "/images/instagram/marapu.jpg",
    link: "https://www.instagram.com/rasjahknow/p/DB_4BrmTT1a/?img_index=1",
    description: "Marupu",
    video: false,
  },
  {
    id: 2,
    image: "/images/instagram/ras-africa-media-award.jpg",
    link: "https://www.instagram.com/rasjahknow/p/BqAHWCFAmzQ/?img_index=1",
    description: "Ras Africa Media Award",
    video: false,
  },
  {
    id: 3,
    image: "/images/instagram/ras-bob-marley.jpg",
    link: "https://www.instagram.com/rasjahknow/p/DJxkPjfzrsq/",
    description: "Ras Africa Media Award",
    video: false,
  },
  {
    id: 4,
    image: "/images/instagram/spicks-specks.jpg",
    link: "https://www.instagram.com/rasjahknow/reel/CjFQxjXAtoT/",
    description: "Spicks Specks",
    video: false,
  },
  {
    id: 5,
    image: "/images/instagram/jah-jah-man.jpg",
    link: "https://www.instagram.com/p/Bsn8rj_AE4Q/?igsh=d2w1ZWg3c3owdHlk",
    description: "Jah Jah Man",
    video: true,
  },
  {
    id: 6,
    image: "/images/instagram/antenna-award.jpg",
    link: "https://www.instagram.com/rasjahknow/reel/CkaNhWuAHUx/",
    description: "Antenna Award",
    video: true,
  },
];

const Instagram = () => {
  return (
    <>
      <style>
        {`
          @keyframes shadingAnimation {
            0% { opacity: 0.5; }
            50% { opacity: 1; }
            100% { opacity: 0.5; }
          }
        `}
      </style>
      <section>
        <h2 className="font-semibold uppercase text-2xl mb-6 text-white">
          FOLLOW{" "}
          <a
            href="https://www.instagram.com/rasjahknow/"
            className="underline hover:no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            @RASJAHKNOW
          </a>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 gap-1">
          {instagramPosts.length === 0 &&
            [...Array(6)].map((_: any, i: number) => (
              <div key={i}>
                <a href="#" title="Blank Href">
                  <div
                    className="relative w-full md:h-60 sm:h-48 h-80"
                    style={{
                      animation: "shadingAnimation 3s infinite",
                      background: "black",
                      opacity: 0.5,
                    }}
                  >
                    <div className="bg-gray-500 absolute w-full h-full left-0 bottom-0 top-0 right-0" />
                  </div>
                </a>
              </div>
            ))}
          {instagramPosts.length > 0 &&
            instagramPosts.slice(0, 6).map((item: InstagramPost, i: number) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="relative w-full md:h-60 sm:h-48 h-80">
                  <div className="bg-black bg-opacity-30 absolute w-full h-full left-0 bottom-0 top-0 right-0 hover:bg-gray-900 hover:bg-opacity-50" />
                  <img
                    className="object-cover w-full h-full"
                    src={item.image}
                    alt={item.description}
                    loading="lazy"
                  />
                  {item.video && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        className="w-12 h-12 text-white opacity-80 hover:opacity-100 transition-opacity"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                      </svg>
                    </div>
                  )}
                </div>
              </a>
            ))}
        </div>
      </section>
    </>
  );
};

export default Instagram;
