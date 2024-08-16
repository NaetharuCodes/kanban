import { Board } from "../../types";
import SideBarTab from "../AppShell/SideBarTab";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import NewBoardIcon from "../Icons/NewBoardIcon";
import styles from "./NewBoardContent.module.css";

interface NewBoardContentProps {
  allBoards: Board[] | undefined;
  activeBoardId: number | null;
  changeActiveBoard: (id: number) => void;
  toggleNewBoardModal: () => void;
}

const NewBoardContent = ({
  allBoards,
  activeBoardId,
  changeActiveBoard,
  toggleNewBoardModal,
}: NewBoardContentProps) => {
  return (
    <>
      <div className={styles.topContainer}>
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
          onClick={toggleNewBoardModal}
          className={`${styles.createNewButton} heading-md`}
        >
          <NewBoardIcon />+ Create New Board
        </button>
      </div>
      <div className={styles.bottomContainer}>
        <DarkModeToggle />
      </div>
    </>
  );
};

export default NewBoardContent;
