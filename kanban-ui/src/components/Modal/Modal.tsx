import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
}

const Modal = ({ children, toggleModal }: ModalProps) => {
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={styles.container} onClick={handleBackgroundClick}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
