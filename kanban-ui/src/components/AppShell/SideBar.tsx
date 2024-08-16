import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./SideBar.module.css";
import EyeIcon from "../Icons/EyeIcon";
import OpenEyeIcon from "../Icons/OpenEyeIcon";
import NewBoardContent from "../NewBoardContent/NewBoardContent";
import { Board } from "../../types";

interface SideBarProps {
  toggleShowSideBar: () => void;
  showSideBar: boolean;
  toggleBoardModal: () => void;
  allBoards: Board[];
  activeBoardId: number | null;
  changeActiveBoard: (id: number) => void;
}

const SideBar = ({
  showSideBar,
  toggleShowSideBar,
  allBoards,
  activeBoardId,
  changeActiveBoard,
  toggleBoardModal,
}: SideBarProps) => {
  const { darkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={`${styles.container} ${showSideBar && styles.visible}`}>
      <NewBoardContent
        allBoards={allBoards}
        activeBoardId={activeBoardId}
        changeActiveBoard={changeActiveBoard}
        toggleNewBoardModal={toggleBoardModal}
      />
      <div className={styles.innerContainer}>
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
