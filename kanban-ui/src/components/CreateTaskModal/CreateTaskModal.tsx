import { useState } from "react";
import Modal from "../Modal/Modal";
import TextField from "../TextField/TextField";
import styles from "./CreateTaskModal.module.css";
import CrossIcon from "../Icons/CrossIcon";
import MainButton from "../MainButton/MainButton";
import DropDown from "../DownDown/DropDown";

interface FormData {
  name: string;
  text: string;
  subtasks: string[];
  status: string;
}

const CreateTaskModal = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    text: "",
    subtasks: [],
    status: "",
  });

  const handleUpdateForm = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <Modal toggleModal={() => {}}>
      <form
        className={styles.form}
        action="submit"
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
        }}
      >
        <h2 className="heading-lg">Create New task</h2>
        <TextField
          placeholder="name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUpdateForm("name", e.target.value)
          }
        />
        <textarea
          className={styles.textArea}
          value={formData.text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            handleUpdateForm("text", e.target.value)
          }
        />
        <div className={styles.subTaskContainer}>
          {formData.subtasks.map((task, index) => (
            <div className={styles.subTaskInput} key={`subtask-${index}`}>
              <input
                value={task}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const updatedArray = [...formData.subtasks];
                  updatedArray[index] = e.target.value;
                  handleUpdateForm("subtasks", updatedArray);
                }}
              />
              <button
                className={styles.subTaskCancel}
                onClick={() => {
                  handleUpdateForm(
                    "subtasks",
                    formData.subtasks.filter((_, i) => i !== index)
                  );
                }}
              >
                <CrossIcon />
              </button>
            </div>
          ))}
          <MainButton
            buttonType="button"
            type="secondary"
            text="+ Add New Subtask"
            onClick={() =>
              handleUpdateForm("subtasks", [...formData.subtasks, ""])
            }
          />
        </div>
        <DropDown values={["one", "two"]} value={"one"} setValue={() => {}} />
        <MainButton buttonType="submit" type="primary" text="Save Changes" />
      </form>
    </Modal>
  );
};

export default CreateTaskModal;
