import { useState } from "react";
import BrandIcon from "../Icons/BrandIcon";
import ChevronArrow from "../Icons/ChevronArrow";
import PlusIcon from "../Icons/PlusIcon";
import VerticalPipIcon from "../Icons/VerticalPipIcon";
import styles from "./AppShell.module.css";
import SideBar from "./SideBar";

interface AppShellProps {
  children: React.ReactNode;
  sideBar?: boolean;
  allBoards: any;
  activeBoardId: number | null;
  activeBoardTitle: string;
  changeActiveBoard: (id: number) => void;
  toggleDeleteModal: () => void;
  toggleBoardModal: () => void;
  toggleSidebarModal: () => void;
}

const AppShell = ({
  children,
  toggleBoardModal,
  allBoards,
  activeBoardId,
  activeBoardTitle,
  changeActiveBoard,
  toggleDeleteModal,
  toggleSidebarModal,
}: AppShellProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="flex-row">
          <div className={styles.brandContainer}>
            <BrandIcon />
            <h1 className={`${styles.brandText} heading-xl`}>kanban</h1>
          </div>
          <button
            className={`${styles.boardHeaderBtn} heading-lg`}
            onClick={toggleSidebarModal}
          >
            {activeBoardTitle} <ChevronArrow />
          </button>
          <h2 className={`${styles.boardHeaderTitle} heading-lg`}>
            {activeBoardTitle}
          </h2>
        </div>
        <div className="flex-row">
          <button className={styles.button}>
            <PlusIcon />
          </button>
          <button className={`${styles.buttonText} heading-md`}>
            + Add New Task
          </button>
          <button className={styles.pipButton} onClick={toggleDeleteModal}>
            <VerticalPipIcon />
          </button>
        </div>
      </header>
      <SideBar
        toggleBoardModal={toggleBoardModal}
        toggleShowSideBar={handleToggleSidebar}
        showSideBar={showSidebar}
        allBoards={allBoards}
        activeBoardId={activeBoardId}
        changeActiveBoard={changeActiveBoard}
      />
      <div className={`${styles.main} ${showSidebar && styles.shiftedMain}`}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;
