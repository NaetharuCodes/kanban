import { useState } from "react";
import ChevronArrow from "../Icons/ChevronArrow";
import styles from "./DropDown.module.css";

interface DropDownProps {
  values: string[];
  value: string;
  setValue: (value: string) => void;
}

const DropDown = ({ values, value, setValue }: DropDownProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${
          showOptions && styles.buttonOpen
        } text-lg `}
        onClick={handleToggleOptions}
      >
        {value ? value : "Choose an Option"}
        <ChevronArrow />
        {showOptions && (
          <div className={`${styles.optionsBox} text-lg`}>
            {values.map((option) => (
              <div key={option} onClick={() => setValue(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default DropDown;
