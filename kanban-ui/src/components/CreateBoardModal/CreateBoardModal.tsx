import { useState } from "react";
import MainButton from "../MainButton/MainButton";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import styles from "./CreateBoardModal.module.css";

interface CreateBoardModalProps {
  toggleModal: () => void;
  createNewBoard: (boardName: string) => void;
}

const CreateBoardModal = ({
  toggleModal,
  createNewBoard,
}: CreateBoardModalProps) => {
  const [name, setName] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <h2 className={styles.header}>Add New Board</h2>
      <form action="submit" onSubmit={() => createNewBoard(name)}>
        <TextField
          label="name"
          placeholder="e.g. Web Design"
          value={name}
          onChange={handleNameChange}
        />
        <MainButton text="Create New Board" type="primary" disabled={!name} />
      </form>
    </Modal>
  );
};

export default CreateBoardModal;
