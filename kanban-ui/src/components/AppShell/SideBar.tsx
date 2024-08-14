import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import MoonIcon from "../Icons/MoonIcon";
import NewBoardIcon from "../Icons/NewBoardIcon";
import SunIcon from "../Icons/SunIcon";
import styles from "./SideBar.module.css";
import SideBarTab from "./SideBarTab";
import EyeIcon from "../Icons/EyeIcon";
import OpenEyeIcon from "../Icons/OpenEyeIcon";

interface SideBarProps {
  toggleShowSideBar: () => void;
  showSideBar: boolean;
  toggleBoardModal: () => void;
  allBoards: any;
  activeBoardId: number | null;
  changeActiveBoard: (id: number) => void;
}

const SideBar = ({
  showSideBar,
  toggleShowSideBar,
  toggleBoardModal,
  allBoards,
  activeBoardId,
  changeActiveBoard,
}: SideBarProps) => {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`${styles.container} ${showSideBar && styles.visible}`}>
      <div className={styles.innerContainer}>
        <div className={`${styles.boardsNumber} heading-sm`}>{`All BOARDS (${
          allBoards ? allBoards.length : 0
        })`}</div>
        {allBoards &&
          allBoards.map((board: { id: number; name: string }) => (
            <SideBarTab
              key={board.id}
              title={board.name}
              onClick={() => changeActiveBoard(board.id)}
              value={board.id}
              active={board.id === activeBoardId}
            />
          ))}
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
