import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";
import styles from "./DarkModeToggle.module.css";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={styles.darkModeToggle}>
      <SunIcon />
      <button
        className={`${styles.darkModeBtn} ${darkMode && styles.active}`}
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      />
      <MoonIcon />
    </div>
  );
};

export default DarkModeToggle;
