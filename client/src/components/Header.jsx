import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between p-3 items-center mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="text-sm font-bold sm:text-xl flex flex-wrap">
            <span className="font-semibold text-slate-500">Radhey</span>
            <span className="text-slate-700 font-semibold">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 flex items-center rounded-lg p-3">
          <input
            placeholder="Search..."
            type="text"
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className=" items-center gap-4 hidden sm:flex">
          <Link to="/">
            <li className="text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-slate-700 hover:underline">About</li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-700 hover:underline">SignIn</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
