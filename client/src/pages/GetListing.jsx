import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faChair,
  faLocationDot,
  faSquareParking,
} from "@fortawesome/free-solid-svg-icons";
import Contact from "../components/Contact";
import { useSelector } from "react-redux";
import { FaShare } from "react-icons/fa";

function GetListing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const params = useParams();
  useEffect(
    function () {
      const getLisiting = async () => {
        try {
          setError(false);
          setLoading(true);
          // console.log(params.id);
          const res = await fetch(`/api/listing/getlisting/${params.id}`, {
            method: "GET",
          });

          const data = await res.json();
          console.log(data);

          if (data.success === false) {
            console.log("Something went wrong while fetching data!!");
            setError(data.message);
            throw new Error();
          }
          setListing(data);
          setLoading(false);
          setError(false);
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      getLisiting();
    },
    [params.id]
  );

  function handleContactForm() {
    console.log(listing.userRef, currentUser, currentUser?._id);
    if (listing.userRef === currentUser._id) {
      return;
    }
    setContactFormOpen(!contactFormOpen);
  }

  return (
    // <div>
    //   {error && <h1>Error...</h1>}
    //   {loading && <h1>Loading...</h1>}
    //   {listing && !error && !loading && <h1>{listing.name}</h1>}
    // </div>
    <div>
      {loading && <p className="text-center text-3xl my-9">Loading...</p>}
      {error && <p className="text-red-700 text-center text-3xl my-9">error</p>}
      {listing && !loading && !error && (
        <div className="">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] w-full"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center cursor-pointer bg-slate-100 text-slate-600">
            <FaShare
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 8000);
              }}
            />
          </div>
          <div className=" md:px-40 px-20 py-10 ">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold ">{listing.name}</h2>
              {listing.offer && (
                <h1 className="bg-red-800  font-semibold text-lg text-white justify-center py-1 px-5 max-w-[200px] w-full rounded-md text-center">
                  Cost - $
                  {listing?.discountPrice
                    ? listing.discountPrice
                    : listing.regularPrice}
                </h1>
              )}
            </div>

            <p className="py-3 text-md text-green-900">
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className=" w-3 aspect-square px-1"
                />
              </span>

              <span className="text-green"> {listing.address}</span>
            </p>
            <div>
              <div className="bg-red-800 py-2 my-2 w-60 text-center uppercase font-semibold text-white rounded-lg">
                For {listing.type}
              </div>
            </div>
            <div>
              <strong>Description - </strong>
              {listing.description}
            </div>
            <ul className="flex gap-4 py-4 text-md text-green-900 font-semibold text-sm flex-wrap">
              {listing?.bedrooms && (
                <li className=" text-green-900 flex items-center gap-1 whitespace-nowrap">
                  <FontAwesomeIcon icon={faBed} className="pr-2" />
                  <span>{listing.bedrooms} Bedrooms</span>
                </li>
              )}
              {listing?.bathrooms && (
                <li className=" text-green-900">
                  <FontAwesomeIcon icon={faBath} className="pr-2" />
                  <span>{listing.bathrooms} Bathrooms</span>
                </li>
              )}
              <li className=" text-green-900">
                <FontAwesomeIcon icon={faSquareParking} className="pr-2" />
                {listing?.parking ? "Parking" : "No Parking"}
              </li>
              {listing?.furnished && (
                <li className=" text-green-900">
                  <FontAwesomeIcon icon={faChair} className="pr-2" />
                  <span>Furnished</span>
                </li>
              )}
            </ul>
            <button
              className="w-full text-white rounded-lg p-3 text-center text-xl uppercase font-semibold bg-green-900"
              onClick={() => handleContactForm()}
            >
              Contact Landlord
            </button>
            {contactFormOpen && <Contact listing={listing} />}
          </div>
        </div>
      )}
      {/* <div>
        <p>
          {listing.name} - {listing.regularPrice}
        </p>
        <p>🗺️{listing.address}</p>
        <div className=" text-white bg-red-800 px-6  py-2">
          For {listing.type}
        </div>
        <p>
          <strong>Description</strong>- {listing.description}
        </p>
        <span>🛏️ {listing.bedrooms} Beds</span>
        <span>🛁 {listing.bathrooms} Baths</span>
        {listing.parkingSlot && <span> 🅿️ Parking spot</span>}
        {listing.furnished ? (
          <span>🪑 Furnished</span>
        ) : (
          <span>🪑Not Furnished</span>
        )}
      </div> */}
    </div>
  );
}

export default GetListing;
