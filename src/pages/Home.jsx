import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAsync } from "../store/features/users/userSlice";
import Pagination from "../components/Pagination";
import SortOptions from "../components/SortOptions";
import EditUserModal from "../components/Modals/EditUserModal";
import DeleteUserModal from "../components/Modals/DeleteUserModal";

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
            <EditUserModal
              title="Add a User"
              type="add"
              saveBtnText="Create User"
            />
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
                  <td className="py-3 px-4 flex justify-between">
                    <EditUserModal
                      title="Edit user"
                      type="edit"
                      userDetails={user}
                      saveBtnText="Save User"
                    />
                    <DeleteUserModal uId={user?._id} uName={user?.name} />
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
