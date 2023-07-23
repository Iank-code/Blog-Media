import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Login from "./pages/auth/Login.tsx";
import Register from "./pages/auth/Register.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import MyPost from "./pages/MyPost.tsx";
import Feed from "./pages/Feed.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

// import ProtectedRoute from "./ProtectedRoute.tsx.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/register" element={<Register />} />

          {/* Route for authenticated users */}
          <Route
            path="/landing"
            element={
              <ProtectedRoute
                to="/landing"
                outlet={
                  <Suspense
                    fallback={<div className="loading">Loading...</div>}
                  >
                    <LandingPage />
                  </Suspense>
                }
              />
            }
          />
          {/* <Route path="/landing" element={<LandingPage />} /> */}
          <Route path="/mypost" element={<MyPost />} />
          <Route
            path="/mypost"
            element={
              <ProtectedRoute
                to="/mypost"
                outlet={
                  <Suspense
                    fallback={<div className="loading">Loading...</div>}
                  >
                    <MyPost />
                  </Suspense>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
