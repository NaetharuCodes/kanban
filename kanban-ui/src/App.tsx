import CheckBox from "./components/CheckBox/CheckBox";
import MainButton from "./components/MainButton/MainButton";

const App = () => {
  return (
    <div className="heading-xl">
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
          text="Button Primary (LG)"
          onClick={() => console.log("you click me")}
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
      </div>
    </div>
  );
};

export default App;
