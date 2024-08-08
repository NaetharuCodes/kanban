import { useEffect, useState } from "react";
import CheckBox from "./components/CheckBox/CheckBox";
import DropDown from "./components/DownDown/DropDown";
import MainButton from "./components/MainButton/MainButton";
import TextField from "./components/TextField/TextField";
import { useTheme } from "./context/ThemeContext";
import styles from "./App.module.css";

const App = () => {
  const [dropDownValue, setDropDownValue] = useState<string>("");

  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleSetDropDown = (value: string) => {
    setDropDownValue(value);
  };

  return (
    <div className={styles.container}>
      <h1 className="heading-xl">Heading XL</h1>
      <h2 className="heading-lg">Heading L</h2>
      <h3 className="heading-md">Heading M</h3>
      <h4 className="heading-sm">Heading S</h4>
      <p className="text-lg">
        This is some large body text that we are testing
      </p>
      <p className="text-md">
        This is some medium body text that we are testing
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "10px",
        }}
      >
        <MainButton
          text="Tolggle Dark Mode"
          onClick={toggleDarkMode}
          type="primary"
          large
        />
        <MainButton
          text="Button Primary"
          onClick={() => console.log("you click me")}
          type="primary"
        />
        <MainButton
          text="Button Secondary"
          onClick={() => console.log("you click me")}
          type="secondary"
        />
        <MainButton
          text="Button Destructive"
          onClick={() => console.log("you click me")}
          type="destructive"
        />
        <CheckBox
          label="Task 1"
          taskId="0001"
          checked={true}
          onChange={() => {}}
        />
        <CheckBox
          label="Task 1"
          taskId="0001"
          checked={false}
          onChange={() => {}}
        />
        <TextField
          placeholder="This is some placeholder text"
          errorMessage="Can't be empty"
        />
        <TextField
          placeholder="This is some placeholder text"
          error
          errorMessage="Can't be empty"
        />
        <DropDown
          values={["Fries", "burgers"]}
          value={dropDownValue}
          setValue={handleSetDropDown}
        />
      </div>
    </div>
  );
};

export default App;
