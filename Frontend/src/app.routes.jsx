import { createBrowserRouter } from "react-router";
import AppLayout from "./components/layout/AppLayout.jsx";
import Feed from "./features/posts/pages/Feed.jsx";
import Profile from "./features/profile/pages/Profile.jsx";
import Explore from "./features/explore/pages/Explore.jsx";
import Notifications from "./features/notifications/pages/Notifications.jsx";
import Messages from "./features/messages/pages/Messages.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: "explore",
        element: <Explore />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;