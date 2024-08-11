import AppShell from "./components/AppShell/AppShell";
import dummyData from "./dummyData.json";
import styles from "./App.module.css";
import Column from "./components/Column/Column";

const App = () => {
  console.log(dummyData);
  console.log(dummyData.colData[1].colColor);

  return (
    <AppShell>
      <div className={styles.mainContainer}>
        {dummyData.colData.map((col) => (
          <Column
            key={col.colId}
            colId={col.colId}
            colName={col.colName}
            colColor={col.colColor}
            colItems={col.colItems}
          />
        ))}
      </div>
    </AppShell>
  );
};

export default App;
