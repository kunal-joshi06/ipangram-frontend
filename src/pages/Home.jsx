import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../store/features/users/userSlice";
import Pagination from "../components/Pagination";
import SortOptions from "../components/SortOptions";
import EditUserModal from "../components/Modals/EditUserModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";
import { Link } from "react-router-dom";
import { getProfileAsync } from "../store/features/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedInUser = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.user.users);
  const pagination = useSelector((state) => state.user.pagination);
  const totalPages = pagination.totalPages;

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const handleSortChange = (sortBy, sortOrder) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
    setPage(1);
  };

  const handlePageChange = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    dispatch(getProfileAsync(token));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(getUsersAsync({ page, sortBy, sortOrder }));
  }, [dispatch, page, sortBy, sortOrder]);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-12">Users</h1>
      <div className="flex min-h-screen justify-center">
        <div className="overflow-x-auto">
          <div
            className={
              loggedInUser.role === "manager"
                ? "flex justify-between"
                : "flex justify-end"
            }
          >
            {loggedInUser.role === "manager" && (
              <EditUserModal
                title="Add a User"
                type="add"
                saveBtnText="Create User"
              />
            )}
            <SortOptions sortChange={handleSortChange} />
          </div>
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {users.map((user, index) => (
                <tr key={index} className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">{user?.name}</td>
                  <td className="py-3 px-4">{user?.email}</td>
                  <td className="py-3 px-4">{user?.role}</td>
                  <td className="py-3 px-4">{user?.location}</td>
                  <td className="py-3 px-4">
                    {user?.department ? user.department : "Not Assigned"}
                  </td>
                  {loggedInUser.role === "manager" ? (
                    <td className="py-3 px-4 flex justify-between">
                      <EditUserModal
                        title="Edit user"
                        type="edit"
                        userDetails={user}
                        saveBtnText="Save User"
                      />
                      <DeleteUserModal uId={user?._id} uName={user?.name} />
                      <div className="flex items-center">
                        <Link
                          className="font-medium text-blue-600 hover:text-blue-800 mx-2"
                          to={`users/${user?._id}`}
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  ) : (
                    <td className="py-3 px-4 flex justify-between">
                      <Link
                        className="font-medium text-blue-600 hover:text-blue-800 mx-2"
                        to={`users/${user?._id}`}
                      >
                        View
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            pageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
