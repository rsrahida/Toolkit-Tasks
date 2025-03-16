import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ShoppingPage from "./pages/ShoppingPage";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import NotificationPage from "./pages/NotificationPage";

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/notification" element={<NotificationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
