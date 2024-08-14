import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import MoonIcon from "../Icons/MoonIcon";
import NewBoardIcon from "../Icons/NewBoardIcon";
import SunIcon from "../Icons/SunIcon";
import styles from "./SideBar.module.css";
import SideBarTab from "./SideBarTab";
import EyeIcon from "../Icons/EyeIcon";
import OpenEyeIcon from "../Icons/OpenEyeIcon";

const numberOfBoards = 3;

interface SideBarProps {
  toggleShowSideBar: () => void;
  showSideBar: boolean;
  toggleBoardModal: () => void;
}

const SideBar = ({
  showSideBar,
  toggleShowSideBar,
  toggleBoardModal,
}: SideBarProps) => {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleCreateNewBoard = async () => {
    try {
      const url = "http://localhost:3000/api/boards";
      const response = await fetch(url, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Error in the response");
      } else {
        const text = await response.text();
        console.log(text);
      }
    } catch {
      console.log("inside the catch");
    }
  };

  return (
    <div className={`${styles.container} ${showSideBar && styles.visible}`}>
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
        <button
          onClick={toggleBoardModal}
          className={`${styles.createNewButton} heading-md`}
        >
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
          onClick={toggleShowSideBar}
        >
          <EyeIcon />
          Hide Sidebar
        </button>
        <button
          className={`${styles.openSidebar} ${
            showSideBar && styles.hideButton
          }`}
          onClick={toggleShowSideBar}
        >
          <OpenEyeIcon />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
