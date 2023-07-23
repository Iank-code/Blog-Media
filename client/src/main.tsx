import React from "react";
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
          <Route path="/landing" element={<LandingPage />} />

          {/* Route for authenticated users */}
          <Route path="/mypost" element={<MyPost />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
