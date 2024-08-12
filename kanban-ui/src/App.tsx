import AppShell from "./components/AppShell/AppShell";
import dummyData from "./dummyData.json";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useEffect, useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";

export type TaskModalType = {
  id: string;
  title: string;
  description: string;
  openTasks: number;
  completeTasks: number;
  subTasks: SubTaskType[];
};

type SubTaskType = {
  description: string;
  complete: boolean;
};

const App = () => {
  const [viewTaskModal, setViewtaskModal] = useState<boolean>(true);
  const [taskId, setTaskId] = useState<string | undefined>("");
  const [taskModalData, setTaskModalData] = useState<undefined | TaskModalType>(
    undefined
  );

  const handleToggleViewTaskModal = (id?: string) => {
    setTaskId(id);
    setViewtaskModal(!viewTaskModal);
  };

  useEffect(() => {
    setTaskModalData({
      id: "Test",
      title: "This is the title",
      description: "A description of the current task",
      openTasks: 3,
      completeTasks: 1,
      subTasks: [
        {
          description: "some task",
          complete: false,
        },
      ],
    });
  }, [taskId]);

  return (
    <AppShell>
      {viewTaskModal && (
        <ViewTaskModal
          toggleModal={handleToggleViewTaskModal}
          taskData={taskModalData}
        />
      )}
      {dummyData.colData ? (
        <div className={styles.mainContainer}>
          {dummyData.colData.map((col) => (
            <Column
              openModal={handleToggleViewTaskModal}
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
