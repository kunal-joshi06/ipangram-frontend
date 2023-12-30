import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUserAsync } from "../store/features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(loginUserAsync(data));
    navigate("/");
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Login</h1>

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

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-900 focus:outline-none my-1"
          >
            Login
          </button>
        </form>

        <div className="text-grey-dark mt-6">
          Don`t have an account?
          <Link
            className="no-underline border-b border-blue text-blue"
            to="/signup"
          >
            Sign up
          </Link>
          .
        </div>
      </div>
    </div>
  );
};

export default Login;
