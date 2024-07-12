import { useEffect, useState } from "react";
import { format } from "date-fns";

const EventsList = () => {
  const [data, setData] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const artist = "Ras Jahknow Band";
      const apiUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=squarespace-todd-wright-gxya&date=upcoming`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    // call the function
    fetchEvents().catch(console.error);
  }, []);

  return (
    <section className="bg-black bg-opacity-80 mx-auto pb-8 pt-4">
      <div className="w-11/12 md:w-9/12 mx-auto my-5">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-2xl font-semibold py-10 uppercase">
            Upcoming Shows
          </h3>
        </div>
        <div className="bg-gray-500 bg-opacity-70 py-4 p-8 mb-2  hidden md:grid  md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] text-white uppercase font-semibold">
          <div className="">Date</div>
          <div className="md:flex">Event</div>
          <div className="hidden md:flex">Location</div>
          <div className="w-full md:text-right">Tickets</div>
        </div>
        {loading ? (
          <div className="bg-gray-600 bg-opacity-70 p-8 mb-2 text-center text-white w-full flex justify-center">
            <img src="/spinner.svg" alt="Loading spinner" />
          </div>
        ) : (
          ""
        )}
        {data && data.length === 0 ? (
          <div className="bg-gray-600 bg-opacity-70 p-8 mb-2 text-left text-white w-full flex justify-start">
            No upcoming events found...
          </div>
        ) : (
          ""
        )}
        {data &&
          data.map((event: any, i: number) => {
            return (
              <div
                key={i}
                className="bg-gray-600 bg-opacity-70 p-8 mb-2 grid grid-cols-[1fr_0.5fr_0.5f] md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] items-center text-white"
              >
                <div className="hidden md:flex uppercase font-medium mb-2 md:mb-0">
                  {format(new Date(event.datetime), "LLL d eee")}
                </div>
                <div className="md:w-0 flex md:hidden uppercase font-medium mb-3 md:mb-0">
                  {format(new Date(event.datetime), "LLL d eee")}
                </div>
                <div className="md:flex mb-3 md:mb-0">{event.venue.name}</div>
                <div className="md:flex flex-col mb-3 md:mb-0">
                  <a
                    className="underline underline-offset-4"
                    target="_blank"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${event.venue.street_address} ${event.venue.city} ${event.venue.country} ${event.venue.postal_code}`
                    )}`}
                  >
                    <div className="address flex mb-3 md:mb-0">
                      <div className="flex mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Google Maps"
                          role="img"
                          viewBox="0 0 512 512"
                          width="24" // Set width to 24px for a small icon size
                          height="24" // Set height to 24px for a small icon size
                        >
                          <rect
                            width="512"
                            height="512"
                            rx="15%"
                            fill="transparent"
                          />
                          <clipPath id="a">
                            <path d="M375 136a133 133 0 00-79-66 136 136 0 00-40-6 133 133 0 00-103 48 133 133 0 00-31 86c0 38 13 64 13 64 15 32 42 61 61 86a399 399 0 0130 45 222 222 0 0117 42c3 10 6 13 13 13s11-5 13-13a228 228 0 0116-41 472 472 0 0145-63c5-6 32-39 45-64 0 0 15-29 15-68 0-37-15-63-15-63z" />
                          </clipPath>
                          <g stroke-width="130" clip-path="url(#a)">
                            <path stroke="#fbbc04" d="M104 379l152-181" />
                            <path stroke="#4285f4" d="M256 198L378 53" />
                            <path stroke="#34a853" d="M189 459l243-290" />
                            <path stroke="#1a73e8" d="M255 120l-79-67" />
                            <path stroke="#ea4335" d="M76 232l91-109" />
                          </g>
                          <circle cx="256" cy="198" r="51" fill="#4e4e4e" />
                        </svg>
                      </div>
                      Google Map Address
                    </div>
                    {/* <div className="country_pc">
                        {event.venue.country}, {event.venue.postal_code}
                      </div> */}
                  </a>
                </div>
                <div className="w-full md:text-right mt-2">
                  <a
                    href={event.offers[0].url}
                    rel="noreferrer"
                    target="_blank"
                    title={event.title}
                    className="w-full cursor-pointer appearance-none py-2 my-4 px-4 bg-transparent border-2 uppercase text-white font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  >
                    Buy Tickets
                  </a>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default EventsList;
