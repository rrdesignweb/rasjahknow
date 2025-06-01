import { useEffect, useState } from "react";
import { format } from "date-fns";
import useIsHydrated from "../hooks/useIsHydrated";

const EventsList = () => {
  const [upcomingData, setUpcomingData] = useState<any>();
  const [pastData, setPastData] = useState<any>();
  const [loading, setIsLoading] = useState<boolean>(false);
  const isHydrated = useIsHydrated();

  const loadingComponent = () => {
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-opacity-70 p-8 mb-2 grid grid-cols-[1fr_0.5fr_0.5f] md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] items-center bg-gray-500 animate-[shimmer_1s_infinite] bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 bg-[length:400%_100%]"
          >
            <div className="w-auto p-8 h-6 bg-transparent"></div>
            <div className="w-auto p-8 h-6 bg-transparent"></div>
            <div className="w-auto p-8 h-6 bg-transparent"></div>
            <div className="w-auto p-8 h-6 bg-transparent"></div>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const artist = "Ras Jahknow Band";
      const baseUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=squarespace-todd-wright-gxya`;
      
      try {
        const [upcomingResponse, pastResponse] = await Promise.all([
          fetch(`${baseUrl}&date=upcoming`),
          fetch(`${baseUrl}&date=past`)
        ]);
        
        const upcomingData = await upcomingResponse.json();
        const pastData = await pastResponse.json();
        
        setUpcomingData(upcomingData);
        // Sort past shows by date (newest first) and take the first 10
        const sortedPastData = [...pastData]
          .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
          .slice(0, 10);
        setPastData(sortedPastData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const renderEventsList = (events: any[], title: string) => {
    if (!events || events.length === 0) {
      return (
        <div className="bg-gray-600 bg-opacity-70 p-8 mb-2 text-left text-white w-full flex justify-start">
          No {title.toLowerCase()} events found...
        </div>
      );
    }

    return events.map((event: any, i: number) => (
      <div
        key={i}
        className="bg-gray-600 bg-opacity-70 p-8 mb-2 grid grid-cols-[1fr_0.5fr_0.5f] md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] items-center text-white"
      >
        <div className="hidden md:flex uppercase font-medium mb-2 md:mb-0">
          {format(new Date(event.datetime), "LLL d eee yyyy")}
        </div>
        <div className="md:w-0 flex md:hidden uppercase font-medium mb-3 md:mb-0">
          {format(new Date(event.datetime), "LLL d eee yyyy")}
        </div>
        <div className="md:flex mb-3 md:mb-0">
          <a
            className="hover:underline hover:underline-offset-4"
            target="_blank"
            href={event?.offers[0]?.url ? event?.offers[0]?.url : event.url}
          >
            {event.venue.name}
          </a>
        </div>
        <div className="md:flex flex-col mb-3 md:mb-0">
          <a
            className="underline underline-offset-4 md:no-underline md:hover:underline md:hover:underline-offset-4"
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
                  width="24"
                  height="24"
                >
                  <rect width="512" height="512" rx="15%" fill="transparent" />
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
          </a>
        </div>
        <div className="w-full md:flex md:justify-end md:text-center mt-2 md:mt-0">
          {title === "Past" ? (
            <button
              disabled
              className="w-48 cursor-not-allowed appearance-none py-2 my-2 px-4 bg-gray-500 border-2 uppercase text-white font-semibold shadow-md opacity-50"
            >
              Unavailable
            </button>
          ) : (
            <a
              href={event?.offers[0]?.url ? event?.offers[0]?.url : event.url}
              rel="noreferrer"
              target="_blank"
              title={event.title}
              className="w-48 cursor-pointer appearance-none py-2 my-2 px-4 bg-transparent border-2 uppercase text-white font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
              {event?.offers[0]?.type === "Tickets" ? "Buy Tickets" : ""}
              {event?.offers[0]?.type === "VIP" ? "VIP Tickets" : ""}
              {event?.offers[0]?.type === "Free" ? "Free Event" : ""}
            </a>
          )}
        </div>
      </div>
    ));
  };

  if (!isHydrated)
    return (
      <section className="bg-black bg-opacity-80 mx-auto pb-8 pt-4">
        <div className="w-11/12 md:w-9/12 mx-auto my-5">
          <div className="flex justify-between items-center">
            <h3 className="text-white text-2xl font-semibold py-10 uppercase">
              Loading Shows...
            </h3>
          </div>
          <div className="bg-gray-500 bg-opacity-70 py-4 p-8 mb-2  hidden md:grid  md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] text-white uppercase font-semibold">
            <div className="">Date</div>
            <div className="md:flex">Event</div>
            <div className="hidden md:flex">Location</div>
            <div className="w-full md:text-right">Tickets</div>
          </div>
          {loadingComponent()}
        </div>
      </section>
    );

  return (
    <section className="bg-black bg-opacity-80 mx-auto pb-8 pt-4">
      <div className="w-11/12 md:w-9/12 mx-auto my-5">
        {/* Upcoming Shows Section */}
        <div className="flex justify-between items-center">
          <h3 className="text-white text-2xl font-semibold py-10 uppercase">
            Upcoming Shows
          </h3>
        </div>
        <div className="bg-gray-500 bg-opacity-70 py-4 p-8 mb-2 hidden md:grid md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] text-white uppercase font-semibold">
          <div className="">Date</div>
          <div className="md:flex">Event</div>
          <div className="hidden md:flex">Location</div>
          <div className="w-full md:text-right">Tickets</div>
        </div>
        {loading ? loadingComponent() : renderEventsList(upcomingData, "Upcoming")}

        {/* Past Shows Section */}
        <div className="flex justify-between items-center mt-16">
          <h3 className="text-white text-2xl font-semibold py-10 uppercase">
            Past Shows
          </h3>
        </div>
        <div className="bg-gray-500 bg-opacity-70 py-4 p-8 mb-2 hidden md:grid md:grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] text-white uppercase font-semibold">
          <div className="">Date</div>
          <div className="md:flex">Event</div>
          <div className="hidden md:flex">Location</div>
          <div className="w-full md:text-right">Tickets</div>
        </div>
        {loading ? loadingComponent() : renderEventsList(pastData, "Past")}
      </div>
    </section>
  );
};

export default EventsList;
