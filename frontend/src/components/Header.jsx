import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="bg-emerald-500 flex p-6">
      <h3 className="flex-1 text-3xl m-0">Mern Blog App</h3>
      <ul className="list-none flex gap-5">
        <Link to={"/"}>
          <li className="text-lg font-bold pointer">Home</li>
        </Link>
        <Link to={"/add-blog"}>
          <li className="text-lg font-bold pointer">Add Blog</li>
        </Link>
      </ul>
    </div>
  );
}
