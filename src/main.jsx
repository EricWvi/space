import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ErrorPage from "./pages/errorpage/ErrorPage.jsx";
import Doc from "./pages/document/Doc";
import FileSystem from "./pages/filesystem/FileSystem";
import './main.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/doc/:docId",
        element: <Doc />,
    },
    {
        path: "/files",
        element: <FileSystem />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
