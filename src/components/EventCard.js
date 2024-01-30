import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackbg from "../assets/images/pole-bg2.jpg";
import { REACT_APP_BASE_URL } from "../constants/url";
import axios from "axios";

const EventCard = (event) => {
  const data = event.event;
  const [image, setImage] = useState("");

  useLayoutEffect(() => {
    async function getEventImages() {
      axios
        .get(`${REACT_APP_BASE_URL}/files/${data.eventPicture[0]}/true`)
        .then((image) => {
          setImage(
            `data:${image.headers["content-type"]};base64,${image.data}`
          );
        });
    }
    getEventImages();
  }, [data.eventPicture]);

  return (
    <Link
      to={{
        pathname: `/events/${data._id}`,
      }}
      state={{ data }}
      className="cardwrapper max-w-[600px] bg-white hover:border-gray-500 hover:shadow-black hover:shadow-lg transition duration-400 gap-2 sm:flex sm:flex-row flex-col"
    >
      {image ? (
        <img
          src={image}
          alt={data.name}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover"
        />
      ) : (
        <img
          src={fallbackbg}
          alt={data.name}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover"
        />
      )}
      <div className="flex flex-col flex-grow gap-3 justify-between py-1 pr-2 pl-2 sm:pl-0">
        <div className="text-black text-sm font-semibold font-['General Sans'] text-left">
          {data.dayStarts} {data.dateStarts} - {data.dayEnds} {data.dateEnds}
        </div>
        <div>
          <div className="text-black text-xs sm:text-base font-semibold font-['General Sans']">
            {data.name.length > 78
              ? `${data.name.substring(0, 78)}...`
              : data.name}{" "}
          </div>
          <div className="text-black sm:text-sm text-xs font-normal font-['General Sans'] text-left">
            {data.overview.length > 100
              ? `${data.overview.substring(0, 130)}...`
              : data.overview}{" "}
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-black sm:text-sm text-xs font-bold">
            {data.venue}
          </p>
          <p className="text-black sm:text-md text-sm font-semibold">
            ${data.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
