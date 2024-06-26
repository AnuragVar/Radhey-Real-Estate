import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const navigate = useNavigate();
  const [lisitngs, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(sideBarData);

  useEffect(
    function () {
      const urlParams = new URLSearchParams(location.search);

      const searchTermFromUrl = urlParams.get("searchTerm");
      const typeFromUrl = urlParams.get("type");
      const parkingFromUrl = urlParams.get("parking");
      const furnishedFromUrl = urlParams.get("furnished");
      const offerFromUrl = urlParams.get("offer");
      const sortFromUrl = urlParams.get("sort");
      const orderFromUrl = urlParams.get("order");

      if (
        searchTermFromUrl ||
        typeFromUrl ||
        parkingFromUrl ||
        furnishedFromUrl ||
        offerFromUrl ||
        sortFromUrl ||
        orderFromUrl
      ) {
        setSideBarData({
          searchTerm: searchTermFromUrl || "",
          type: typeFromUrl || "all",
          parking: parkingFromUrl === "true" ? true : false,
          furnished: furnishedFromUrl === "true" ? true : false,
          offer: offerFromUrl === "true" ? true : false,
          sort: sortFromUrl || "createdAt",
          order: orderFromUrl || "desc",
        });
      }

      const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
        const data = await res.json();
        console.log(data);
        setListings(data.data);
        setLoading(false);
      };
      fetchListings();
    },
    [location.search]
  );
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    //offer,furnished,parking
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];

      setSideBarData({ ...sideBarData, sort, order });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    )
      setSideBarData({
        ...sideBarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(2);
    const url = new URLSearchParams();

    url.set("searchTerm", sideBarData.searchTerm);
    url.set("offer", sideBarData.offer);
    url.set("furnished", sideBarData.furnished);
    url.set("parking", sideBarData.parking);
    url.set("type", sideBarData.type);
    url.set("sort", sideBarData.sort);
    url.set("order", sideBarData.order);
    const searchQuery = url.toString();

    navigate(`/search?${searchQuery}`);
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <form
          onSubmit={handleSubmit}
          className="p-7 border-b-2 flex flex-col gap-5"
        >
          <div className="flex gap-3 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <input
              className="rounded-md border-none p-2"
              type="text"
              id="searchTerm"
              placeholder="Search Term..."
              value={sideBarData.searchTerm}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex gap-2 flex-wrap">
            <p className="font-semibold">Type:</p>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.type === "all"}
                id="all"
                onChange={handleChange}
              />
              <p>Rent & Sale</p>
            </div>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.type === "rent"}
                id="rent"
                onChange={handleChange}
              />
              <p>Rent</p>
            </div>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.type === "sale"}
                id="sale"
                onChange={handleChange}
              />
              <p>Sale</p>
            </div>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.offer}
                id="offer"
                onChange={handleChange}
              />
              <p>Offer</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <p className="font-semibold">Amenities:</p>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.parking}
                id="parking"
                onChange={handleChange}
              />
              <p>Parking</p>
            </div>
            <div className="flex gap-2">
              <input
                className="w-4 aspect-square"
                type="checkbox"
                checked={sideBarData.furnished}
                id="furnished"
                onChange={handleChange}
              />
              <p>Furnished</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-semibold">Sort:</p>
            <select
              className="border p-3 rounded-lg"
              defaultValue={"createdAt_desc"}
              id="sort_order"
              onChange={handleChange}
            >
              <option value={"price_desc"}>Price High to Low</option>
              <option value={"price_asc"}>Price Low to High</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95">
            Search
          </button>
          <div></div>
        </form>
        <div className="font-semibold text-3xl p-7">Listing results:</div>
      </div>
    </div>
  );
}

export default Search;
