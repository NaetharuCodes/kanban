import TickIcon from "../Icons/TickIcon";
import styles from "./CheckBox.module.css";

interface CheckBoxProps {
  label: string;
  taskId: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ label, taskId, checked, onChange }: CheckBoxProps) => {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.label} ${checked && styles.checkedLabel}`}
        htmlFor={taskId}
      >
        <div
          className={`${styles.customCheckBox} ${checked && styles.checked}`}
        >
          {checked && <TickIcon />}
        </div>
        {label}
        <input
          id={taskId}
          className={styles.input}
          type="checkbox"
          name={label}
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default CheckBox;
