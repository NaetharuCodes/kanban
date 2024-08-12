import AppShell from "./components/AppShell/AppShell";
import dummyData from "./dummyData.json";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleToggleModal = () => {
    setOpen(!open);
  };

  return (
    <AppShell>
      {open && <Modal toggleModal={handleToggleModal}>Modal</Modal>}
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
