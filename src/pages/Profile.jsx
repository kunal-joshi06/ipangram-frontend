import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAsync, logout } from "../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const memoizedUser = useMemo(() => user, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getProfileAsync(token));
  }, [dispatch, token]);

  return (
    <div className="container mx-auto my-60">
      <div>
        <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
          <div className="mt-16">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              Name : {memoizedUser?.name}
            </h1>

            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                Other Details
              </h3>
              <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                  <span>Email : </span>
                  <span className=" font-bold">{memoizedUser?.email}</span>
                </p>

                <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                  <span>Role : </span>
                  <span className="  font-bold">{memoizedUser?.role}</span>
                </p>

                <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                  <span>Location : </span>
                  <span className=" font-bold">{memoizedUser?.location}</span>
                </p>

                <p className="w-full border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                  <span>Department : </span>
                  <span className=" font-bold">
                    {user?.department
                      ? memoizedUser.department
                      : "Not Assigned Yet"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleLogout}
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-red-500 rounded-full shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-red-500 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-red-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Logout
          </span>
          <span className="relative invisible">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
