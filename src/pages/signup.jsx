import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(import.meta.env.VITE_BACKEND_URL);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user`,
        data
      );
      if (res) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.success("Failed to create user! Try again.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>

          <input
            {...register("name", { required: "Full Name is required" })}
            type="text"
            className={`block border border-grey-light w-full p-3 rounded mb-4 ${
              errors.name && "border-red-500 mb-1"
            }`}
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
          )}

          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            className={`block border border-grey-light w-full p-3 rounded mb-4 ${
              errors.email && "border-red-500 mb-1"
            }`}
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className={`block border border-grey-light w-full p-3 rounded mb-4 ${
              errors.password && "border-red-500 mb-1"
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4">
              {errors.password.message}
            </p>
          )}

          <input
            {...register("location", { required: "Location is required" })}
            type="text"
            className={`block border border-grey-light w-full p-3 rounded mb-4 ${
              errors.location && "border-red-500 mb-1"
            }`}
            placeholder="location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mb-4">
              {errors.location.message}
            </p>
          )}

          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2">
              Role
            </label>
            <div>
              <label className="inline-flex items-center">
                <input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  value="employee"
                />
                <span className="ml-2">Employee</span>
              </label>

              <label className="inline-flex items-center ml-4">
                <input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  value="manager"
                />
                <span className="ml-2">Manager</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mb-4">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1"
          >
            Create Account
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/login"
          >
            Log in
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Signup;
