import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addDepartmentAsync,
  editDepartmentAsync,
} from "../../store/features/departments/departmentSlice";

export default function EditDepartmentModal({
  title,
  type,
  saveBtnText,
  departmentDetails,
}) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const onSubmit = async (data) => {
    if (type === "add") {
      dispatch(addDepartmentAsync(data));
      reset();
    } else {
      dispatch(editDepartmentAsync({ id: departmentDetails._id, data }));
    }
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer 
              ${
                type === "edit"
                  ? "border-b-4 border-l-2 bg-gradient-to-tr from-yellow-500 to-yellow-400 border-yellow-700"
                  : "border-b-4 border-l-2 bg-gradient-to-tr from-green-600 to-green-500 border-green-700"
              }
              active:border-green-600 active:shadow-none shadow-lg text-white`}
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
        <span className="relative">{title}</span>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                      <div className="mt-3 text-center  sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </Dialog.Title>
                        <div className="mt-2">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
                          >
                            <input
                              {...register("name", {
                                required: "Full Name is required",
                              })}
                              type="text"
                              className={`block border border-grey-light w-full p-3 rounded mb-4 ${
                                errors.name && "border-red-500 mb-1"
                              }`}
                              placeholder="Full Name"
                              defaultValue={departmentDetails?.name || ""}
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mb-4">
                                {errors.name.message}
                              </p>
                            )}

                            <button
                              type="submit"
                              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1"
                            >
                              {saveBtnText}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
