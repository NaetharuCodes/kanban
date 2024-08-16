import { useState } from "react";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import styles from "./NewColModal.module.css";

interface NewColModalProps {
  toggleModal: () => void;
  createNewCol: (name: string, color: string) => void;
}

const NewColModal = ({ toggleModal, createNewCol }: NewColModalProps) => {
  const [text, setText] = useState<string>("");
  const [color, setColor] = useState<string>("#BBBBCC");

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <Modal toggleModal={toggleModal}>
      <form
        className={styles.form}
        action="submit"
        onSubmit={() => createNewCol(text, color)}
      >
        <h2 className={styles.header}>Create A New Column</h2>
        <TextField
          placeholder="name"
          value={text}
          onChange={handleChangeText}
        />
        <input
          className={styles.colorPicker}
          type="color"
          value={color}
          onChange={handleChangeColor}
        />
        <button className={styles.button} type="submit" disabled={!text}>
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default NewColModal;
