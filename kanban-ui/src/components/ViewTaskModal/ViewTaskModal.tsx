import CheckBox from "../CheckBox/CheckBox";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
}

const ViewTaskModal = ({ toggleModal }: ViewTaskModalProps) => {
  const sub = 1;

  return (
    <Modal toggleModal={toggleModal}>
      <h2 className={`${styles.heading} heading-lg`}>MODAL HEADING</h2>
      <p className={`${styles.description} text-lg`}>
        This is where the description of the task goes. It will be a few
        sentences that explain what the core task is and how it needs to be
        completed.
      </p>
      <div className={styles.subTaskContainer}>
        <div className={styles.subTaskLabel}>
          Subtasks ({sub} of {sub})
        </div>
        <CheckBox
          label="Subtask Number One"
          checked={false}
          taskId="123"
          onChange={() => {}}
        />
        <CheckBox
          label="Subtask Number One"
          checked={false}
          taskId="123"
          onChange={() => {}}
        />
        <CheckBox
          label="Subtask Number One"
          checked={false}
          taskId="123"
          onChange={() => {}}
        />
      </div>
      <div>
        <div className={styles.dropDownLabel}>Current Status</div>
        <DropDown
          values={["Doing", "Done"]}
          value="Doing"
          setValue={() => {}}
        />
      </div>
    </Modal>
  );
};

export default ViewTaskModal;
