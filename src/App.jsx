import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Departments from "./pages/Departments";
import { useDispatch, useSelector } from "react-redux";
import UserDetails from "./pages/UserDetails";
import { useEffect } from "react";
import { getProfileAsync } from "./store/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedInUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getProfileAsync(token));
  }, [dispatch, token]);

  const protectedRoutes = (element) => {
    return token ? (
      <>
        <Navbar />
        {element}
      </>
    ) : (
      <Login />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? (
        protectedRoutes(
          loggedInUser.role === "manager" ? <Home /> : <Profile />
        )
      ) : (
        <Login />
      ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/departments",
      element: protectedRoutes(<Departments />),
    },
    {
      path: "/profile",
      element: protectedRoutes(<Profile />),
    },
    {
      path: "/users/:id",
      element: protectedRoutes(<UserDetails />),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
