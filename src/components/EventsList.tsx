import { useEffect, useState } from "react";
import { format } from "date-fns";


const EventsList = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchEvents = async () => {
      const artist = "Ras Jahknow Band";
      const apiUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=squarespace-todd-wright-gxya&date=upcoming`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data)
    }
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
        <div
          className="bg-gray-500 bg-opacity-70 py-4 p-8 mb-2 grid grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] text-white uppercase font-semibold"
        >
          <div className="">Date</div>
          <div className="md:flex">Event</div>
          <div className="hidden md:flex">Location</div>
          <div className="w-full text-right">Tickets</div>
        </div>
        {!data && <div className="bg-gray-600 bg-opacity-70 p-8 mb-2 text-center text-white">Loading...</div>}
        {
          data && data
            .slice(0)
            .reverse()
            .map((event: any, i:number) => {
              return (
                <div key={i} className="bg-gray-600 bg-opacity-70 p-8 mb-2 grid grid-cols-[0.25fr_0.5fr_0.5fr_0.25fr] items-center text-white">
                  <div className="hidden md:flex">
                    {format(new Date(event.datetime), "dd/MM/yyyy")}
                  </div>
                  <div className="md:w-0 flex md:hidden">
                    {format(new Date(event.datetime), "dd/MM/yy")}
                  </div>
                  <div className="md:flex">{event.venue.name}</div>
                  <div className="hidden md:flex flex-col">
                    <a
                      className="hover:underline"
                      target="_blank"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${event.venue.street_address} ${event.venue.city} ${event.venue.country} ${event.venue.postal_code}`
                      )}`}
                    >
                      <div className="address">
                        {event.venue.street_address}, {event.venue.city}
                      </div>
                      <div className="country_pc">
                        {event.venue.country}, {event.venue.postal_code}
                      </div>
                    </a>
                  </div>
                  <div className="w-full text-right">
                    <a
                      href={event.url}
                      rel="noreferrer"
                      target="_blank"
                      title={event.title}
                      className="cursor-pointer appearance-none py-2 my-4 px-4 bg-transparent border-2 uppercase text-white font-semibold shadow-md hover:bg-red-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                      Buy
                    </a>
                  </div>
                </div>
              );
            })
        }
      </div>
    </section>
  )
}

export default EventsList;