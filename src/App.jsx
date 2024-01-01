import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Departments from "./pages/Departments";

function App() {
  const token = useSelector((state) => state.auth.token);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          {token ? (
            <>
              <Navbar />
              <Home />
            </>
          ) : (
            <Login />
          )}
        </>
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
      element: (
        <>
          {token ? (
            <>
              <Navbar />
              <Departments />
            </>
          ) : (
            <Login />
          )}
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          {token ? (
            <>
              <Navbar />
              <Profile />
            </>
          ) : (
            <Login />
          )}
        </>
      ),
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
