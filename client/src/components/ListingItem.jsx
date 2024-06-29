import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ListingItem({ listing }) {
  console.log(listing.name);
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-1">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faLocationDot}
              className=" w-4 aspect-square text-green-700"
            />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p>
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/month"}
          </p>
          <div className="text-slate-700 flex items-center gap-2 pt-2">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 bed"}
            </div>
            <div className="font-bold text-xs">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
