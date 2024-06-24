import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`);
  }
  useEffect(
    function () {
      const urlParams = new URLSearchParams(location.search);
      const searchTermInUrl = urlParams.get('searchTerm');
      if(searchTermInUrl){
        setSearchTerm(searchTermInUrl);
      }
    },
    [location.search]
  );
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 items-center mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="text-sm font-bold sm:text-xl flex flex-wrap">
            <span className="font-semibold text-slate-500">Radhey</span>
            <span className="text-slate-700 font-semibold">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 flex items-center rounded-lg p-3"
        >
          <input
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className=" items-center gap-4 hidden sm:flex">
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
