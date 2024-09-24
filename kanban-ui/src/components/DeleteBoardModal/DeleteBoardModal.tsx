import MainButton from "../MainButton/MainButton";
import Modal from "../Modal/Modal";
import styles from "./DeleteBoardModal.module.css";

interface DeleteBoardModalProps {
  title: string;
  deleteBoard: () => void;
  cancel: () => void;
  toggleModal: () => void;
}

const DeleteBoardModal = ({
  title,
  deleteBoard,
  cancel,
  toggleModal,
}: DeleteBoardModalProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <h2 className={`${styles.heading} heading-lg`}>Delete this board?</h2>
      <p className="text-lg">
        Are you sure you want to delete the {title} board? This action will
        remove all columns and tasks, and cannot be reversed.
      </p>
      <div className={styles.buttonContainer}>
        <MainButton
          buttonType="button"
          type="destructive"
          text="Delete"
          onClick={deleteBoard}
          style={{ flexGrow: 1 }}
        />
        <MainButton
          buttonType="button"
          type="secondary"
          text="Cancel"
          onClick={cancel}
          style={{ flexGrow: 1 }}
        />
      </div>
    </Modal>
  );
};

export default DeleteBoardModal;
