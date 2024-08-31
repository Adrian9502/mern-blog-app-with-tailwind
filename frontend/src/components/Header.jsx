import { Link } from "react-router-dom";
import headerlogo from "/headerlogo.png";

export default function Header() {
  return (
    <div className="bg-emerald-500 flex justify-between items-center p-3">
      <Link to="/" className="w-[250px]">
        <img
          src={headerlogo}
          alt="header logo"
          className="w-full object-cover"
        />
      </Link>
      <ul className="list-none text-base flex flex-col gap-3 text-center lg:flex-row md:flex-row md:text-lg lg:text-lg lg:gap-5">
        <li>
          <Link
            to="/"
            className="font-bold  rounded-lg px-5 py-1 lg:py-2 md:py-2 hover:bg-slate-900 hover:text-white transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add-blog"
            className="font-bold  rounded-lg px-5 py-1 lg:py-2 md:py-2 hover:bg-slate-900 hover:text-white transition"
          >
            Add Blog
          </Link>
        </li>
      </ul>
    </div>
  );
}
