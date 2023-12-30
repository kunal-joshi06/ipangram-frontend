import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Link
          to="/"
          className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Users
        </Link>

        <Link
          to="/departments"
          className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
        >
          Departments
        </Link>

        {token ? (
          <Link
            to="/profile"
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className="border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
