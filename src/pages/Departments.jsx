import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsAsync } from "../store/features/departments/departmentSlice";
import EditDepartmentModal from "../components/Modals/EditDepartmentModal";
import DeleteDepartmentModal from "../components/Modals/DeleteDepartmentModal";

const Departments = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);

  useEffect(() => {
    dispatch(getDepartmentsAsync());
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-4xl text-center font-bold my-12">Departments</h1>
      <div className="flex min-h-screen justify-center">
        <div className="overflow-x-auto">
          <div className="flex justify-between">
            <EditDepartmentModal
              title="Add a Department"
              type="add"
              saveBtnText="Create Department"
            />
          </div>
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead>
              <tr className="bg-blue-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">S.No</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-blue-gray-900">
              {departments.map((department, index) => (
                <tr key={index} className="border-b border-blue-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{department?.name}</td>
                  <td className="py-3 px-4 flex justify-between">
                    <EditDepartmentModal
                      title="Edit Department"
                      type="edit"
                      departmentDetails={department}
                      saveBtnText="Save"
                    />
                    <DeleteDepartmentModal
                      dId={department?._id}
                      dName={department?.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;
