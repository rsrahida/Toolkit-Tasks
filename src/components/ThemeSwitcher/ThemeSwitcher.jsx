import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../features/themeSlice";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`theme-switcher ${theme}`}>
      <button onClick={handleThemeChange}>
        {theme === "light" ? "Dark Mode🌑" : "Light Mode🌞"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
