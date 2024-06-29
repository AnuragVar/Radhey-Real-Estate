import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  console.log(offerListings, saleListings, rentListings);
  SwiperCore.use([Navigation]);
  useEffect(function () {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/getlistings?limit=4&offer=true");
        const data = await res.json();
        setOfferListings(data.data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/getlistings?limit=4&type=sale");
        const data = await res.json();
        setSaleListings(data.data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/getlistings?limit=4&type=rent");
        const data = await res.json();
        setRentListings(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* title section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Unlocking Doors to Your <br />{" "}
          <span className="text-slate-500">Dream </span>
          Home.
        </h1>

        <p className="text-slate-500">
          Radhey Real Estate, your trusted partner in finding the perfect home,
          providing exceptional service and unparalleled expertise every step of
          the way.
        </p>
        <Link
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          to={"/search"}
        >
          Let's get started...
        </Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listings) => {
            return (
              <SwiperSlide key={listings.imageUrls}>
                {console.log(listings.imageUrls[0])}
                <div
                  style={{
                    background: `url(${listings.imageUrls[0]})  center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listings._id}
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {/* listings */}
      <div className="flex flex-col gap-10 p-5 py-20 max-w-6xl mx-auto">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold ">Recent Offers:</h1>
          <Link
            to="/search?offer=true"
            className="text-xs sm:text-sm text-blue-800 font-semibold hover:underline"
          >
            See more such offers...
          </Link>
          <div className="flex gap-2 flex-col sm:flex-row flex-wrap">
            {offerListings &&
              offerListings.length > 0 &&
              offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold ">For Sale:</h1>
          <Link
            to="/search?type=sale"
            className="text-xs sm:text-sm text-blue-800 font-semibold hover:underline"
          >
            See more such offers...
          </Link>
          <div className="flex gap-2 flex-col sm:flex-row flex-wrap">
            {saleListings &&
              saleListings.length > 0 &&
              saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold ">For Rent:</h1>
          <Link
            to="/search?type=rent"
            className="text-xs sm:text-sm text-blue-800 font-semibold hover:underline"
          >
            See more such offers...
          </Link>
          <div className="flex gap-2 flex-col sm:flex-row flex-wrap">
            {rentListings &&
              rentListings.length > 0 &&
              rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
