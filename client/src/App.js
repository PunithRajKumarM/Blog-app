import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import CreatePost from "./components/CreatePost/CreatePost";
import RootLayout from "./components/RootLayout/RootLayout";
import BlogPosts from "./components/Blogs/Blogs";
import BlogPostPage from "./pages/BlogPostPage";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/createPost",
          element: <CreatePost />,
        },
        {
          path: "/blogs",
          element: <BlogPosts />,
        },
        {
          path: "/blogs/:blogId",
          element: <BlogPostPage />,
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
