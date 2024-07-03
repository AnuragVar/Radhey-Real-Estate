import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(
    function () {
      const getLandlord = async () => {
        console.log(listing.userRef);
        const res = await fetch(`/api/user/${listing.userRef}`, {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);
        setLandlord(data.data);
      };
      getLandlord();
    },
    [listing.userRef]
  );
  return (
    <div className="flex flex-col py-5 sm:py-10 gap-5">
      <div>
        Contact <span className="font-semibold">{landlord?.userName}</span> for{" "}
        <span className="font-semibold">{listing.name}</span>
      </div>
      <textarea
        className="w-full h-20 p-3 rounded-lg"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here..."
      ></textarea>
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${listing.name}&body=${message}`}
        className="bg-green-900 rounded-lg uppercase font-semibold text-white text-xl p-3 text-center"
      >
        Send
      </Link>
    </div>
  );
}

export default Contact;
