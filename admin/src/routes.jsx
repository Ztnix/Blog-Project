import App from "./App";
import Home from "./pages/home/home";
import ErrorPage from "./pages/errorPage/errorPage";
import SignUpPage from "./pages/signup/signup";
import LoginPage from "./pages/login/login";
import AboutPage from "./pages/about/aboutPage";
import NewBlog from "./pages/newBlog/newBlog";
import FullBlog from "./pages/blog/fullBlog";
import AdminPanel from "./pages/adminPanel/adminPanel";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "adminPanel",
        element: <AdminPanel />,
      },
      {
        path: "blog/:title",
        element: <FullBlog />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "newBlog",
        element: <NewBlog />,
      },
    ],
  },
];

export default routes;
