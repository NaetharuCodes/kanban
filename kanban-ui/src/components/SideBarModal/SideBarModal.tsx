import { Board } from "../../types";
import Modal from "../Modal/Modal";
import NewBoardContent from "../NewBoardContent/NewBoardContent";

interface SideBarModalProps {
  toggleModal: () => void;
  toggleBoardModal: () => void;
  allBoards: Board[] | undefined;
  activeBoardId: number | null;
  changeActiveBoard: (id: number) => void;
}

const SideBarModal = ({
  toggleModal,
  allBoards,
  activeBoardId,
  changeActiveBoard,
  toggleBoardModal,
}: SideBarModalProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <NewBoardContent
        allBoards={allBoards}
        activeBoardId={activeBoardId}
        toggleNewBoardModal={toggleBoardModal}
        changeActiveBoard={changeActiveBoard}
      />
    </Modal>
  );
};

export default SideBarModal;
