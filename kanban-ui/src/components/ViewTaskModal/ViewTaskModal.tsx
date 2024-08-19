import { Col, Ticket } from "../../types";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
  ticket: Ticket | undefined;
  cols: Col[];
}

const ViewTaskModal = ({ toggleModal, ticket, cols }: ViewTaskModalProps) => {
  console.log(ticket);

  return (
    <Modal toggleModal={toggleModal}>
      {ticket && (
        <>
          <h2 className={`${styles.heading} heading-lg`}>{ticket.title}</h2>
          <p className={`${styles.description} text-lg`}>{ticket.text}</p>
          <div>
            <div className={styles.dropDownLabel}>Current Status</div>
            <DropDown
              values={cols.map((col) => col.name)}
              value="Doing"
              setValue={() => {}}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewTaskModal;
