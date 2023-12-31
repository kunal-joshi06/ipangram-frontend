import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../store/features/users/userSlice";
import Pagination from "../components/Pagination";
import SortOptions from "../components/SortOptions";

const Home = () => {
  const dispatch = useDispatch();
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
    dispatch(getUsersAsync({ page, sortBy, sortOrder }));
  }, [dispatch, page, sortBy, sortOrder]);

  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-12">Users</h1>
      <div className="flex min-h-screen justify-center">
        <div className="overflow-x-auto">
          <div className="flex justify-between">
            <button className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-600 to-green-500 border-green-700 text-white">
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <span className="relative">Add User</span>
            </button>
            <SortOptions sortChange={handleSortChange} />
          </div>
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">S.No</th>
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
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user?.name}</td>
                  <td className="py-3 px-4">{user?.email}</td>
                  <td className="py-3 px-4">{user?.role}</td>
                  <td className="py-3 px-4">{user?.location}</td>
                  <td className="py-3 px-4">
                    {user?.department ? user.department : "Not Assigned"}
                  </td>
                  <td className="py-3 px-4">
                    <button className="font-medium text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                  </td>
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
