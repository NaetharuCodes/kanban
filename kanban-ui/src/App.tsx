import AppShell from "./components/AppShell/AppShell";
import dummyData from "./dummyData.json";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";

const App = () => {
  const [viewTaskModal, setViewtaskModal] = useState<boolean>(true);

  const handleToggleViewTaskModal = () => {
    setViewtaskModal(!viewTaskModal);
  };

  return (
    <AppShell>
      {viewTaskModal && (
        <ViewTaskModal toggleModal={handleToggleViewTaskModal} />
      )}
      {dummyData.colData ? (
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
          <div className={styles.newColContainer}>
            <button className={`${styles.newColBtn} heading-xl`}>
              + New Column
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.noColsContainer}>
          <p className={`${styles.noColsText} heading-lg`}>
            This board is empty. Createa a new column to get started.
          </p>
          <button className={`${styles.noColsBtn} heading-md`}>
            + Add New Column
          </button>
        </div>
      )}
    </AppShell>
  );
};

export default App;
