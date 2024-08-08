import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-200 py-5">
      <ul className="container mx-auto flex justify-between">
        <li>
          <Link to="/">Home</Link>
        </li>
        <button>Logout</button>
      </ul>
    </div>
  );
};

export default Navbar;
