import {ConfigProvider, theme as AntTheme} from "antd";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ErrorPage from "./pages/errorpage/ErrorPage.jsx";
import Collection from "./pages/collection/Collection.jsx";
import Doc from "./pages/document/Doc.jsx";
import FileSystem from "./pages/filesystem/FileSystem.jsx";
import LogIn from "./pages/login/LogIn";
import Collections from "./pages/collection/Collections.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <LogIn />,
    },
    {
        path: "/collections",
        element: <Collections />,
    },
    {
        path: "/doc/:colId",
        element: <Collection />,
    },
    {
        path: "/doc/:colId/:docId",
        element: <Doc />,
    },
    {
        path: "/files",
        element: <FileSystem />,
    },
]);

let colorScheme = AntTheme.defaultAlgorithm
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    colorScheme = AntTheme.darkAlgorithm
}

export default function App() {
    const [theme, setTheme] = useState(() => colorScheme);
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                setTheme(() => AntTheme.darkAlgorithm)
            } else {
                setTheme(() => AntTheme.defaultAlgorithm)
            }
        })
    }, [])

    return (
        <>
            <ConfigProvider direction="ltl" theme={{
                algorithm: theme,
            }}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </>
    )
}
