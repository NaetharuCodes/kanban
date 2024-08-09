import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import MoonIcon from "../Icons/MoonIcon";
import NewBoardIcon from "../Icons/NewBoardIcon";
import SunIcon from "../Icons/SunIcon";
import styles from "./SideBar.module.css";
import SideBarTab from "./SideBarTab";
import EyeIcon from "../Icons/EyeIcon";
import OpenEyeIcon from "../Icons/OpenEyeIcon";

const numberOfBoards = 3;

const SideBar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`${styles.container} ${showSidebar && styles.visible}`}>
      <div className={styles.innerContainer}>
        <div
          className={`${styles.boardsNumber} heading-sm`}
        >{`All BOARDS (${numberOfBoards})`}</div>
        <SideBarTab
          title="My Board"
          onClick={(value: string) => console.log(value)}
          value="My Board"
          active
        />
        <SideBarTab
          title="My Board"
          onClick={(value: string) => console.log(value)}
          value="My Board"
        />
        <SideBarTab
          title="My Board"
          onClick={(value: string) => console.log(value)}
          value="My Board"
        />
        <button className={`${styles.createNewButton} heading-md`}>
          <NewBoardIcon />+ Create New Board
        </button>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.darkModeToggle}>
          <SunIcon />
          <button
            className={`${styles.darkModeBtn} ${darkMode && styles.active}`}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          />
          <MoonIcon />
        </div>
        <button
          className={`${styles.hideSidebarBtn} heading-md`}
          onClick={handleToggleSidebar}
        >
          <EyeIcon />
          Hide Sidebar
        </button>
        <button
          className={`${styles.openSidebar} ${
            showSidebar && styles.hideButton
          }`}
          onClick={handleToggleSidebar}
        >
          <OpenEyeIcon />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
