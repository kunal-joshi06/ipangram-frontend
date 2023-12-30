import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAsync } from "../store/features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const memoizedUser = useMemo(() => user, [user]);

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
    </div>
  );
};

export default Profile;
