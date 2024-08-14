import { TaskModalType } from "../../App";
import CheckBox from "../CheckBox/CheckBox";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
  taskData: TaskModalType | undefined;
}

const ViewTaskModal = ({ toggleModal, taskData }: ViewTaskModalProps) => {
  console.log("TASK DATA: ", taskData);

  return (
    <Modal toggleModal={toggleModal}>
      {taskData && (
        <>
          <h2 className={`${styles.heading} heading-lg`}>{taskData.title}</h2>
          <p className={`${styles.description} text-lg`}>
            {taskData.description}
          </p>
          <div className={styles.subTaskContainer}>
            <div className={styles.subTaskLabel}>
              Subtasks ({taskData.completeTasks} of {taskData.openTasks})
            </div>
            {taskData.subTasks.map((subtask) => (
              <CheckBox
                key={subtask.description}
                label={subtask.description}
                checked={subtask.complete}
                onChange={() => {}}
              />
            ))}
          </div>
          <div>
            <div className={styles.dropDownLabel}>Current Status</div>
            <DropDown
              values={["Doing", "Done"]}
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
