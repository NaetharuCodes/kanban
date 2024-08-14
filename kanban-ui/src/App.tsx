import AppShell from "./components/AppShell/AppShell";
import dummyData from "./dummyData.json";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useEffect, useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { Board } from "./types";

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

function findItemById(data: any, targetId: string) {
  for (const column of data.colData) {
    for (const item of column.colItems) {
      if (item.itemId === targetId) {
        return item;
      }
    }
  }
  return null;
}

const App = () => {
  const [viewBoardModal, setViewBoardModal] = useState<boolean>(false);
  const [viewTaskModal, setViewtaskModal] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string | undefined>("");
  const [taskModalData, setTaskModalData] = useState<undefined | TaskModalType>(
    undefined
  );
  const [allBoards, setAllBoards] = useState<Board[]>();
  const [activeBoardId, setActiveBoardId] = useState<number | null>(null);
  const [activeBoard, setActiveBoard] = useState<Board | null>();

  const handleChangeActiveBoard = (id: number) => {
    setActiveBoardId(id);
  };

  const handleCreateNewBoard = async (
    e: React.FormEvent,
    boardName: string
  ) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/api/boards";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: boardName }),
      });
      if (!response.ok) {
        throw new Error("Error in the response");
      } else {
        const newBoard = await response.json();
        console.log("newBoard", newBoard);
        allBoards
          ? setAllBoards([...allBoards, newBoard])
          : setAllBoards(newBoard);
        setActiveBoardId(newBoard.id);
        setActiveBoard(newBoard);
      }
    } catch (error) {
      console.log("inside the catch", error);
    }

    handleToggleBoardModal();
  };

  const handleToggleViewTaskModal = (id?: string) => {
    setTaskId(id);
    setViewtaskModal(!viewTaskModal);
  };

  const handleToggleBoardModal = () => {
    setViewBoardModal(!viewBoardModal);
  };

  useEffect(() => {
    if (taskId) {
      const currentTask = findItemById(dummyData, taskId as string);
      console.log(currentTask);

      setTaskModalData({
        id: currentTask.itemId,
        title: currentTask.itemName,
        description: currentTask.description,
        openTasks: currentTask.itemSubtasks,
        completeTasks: currentTask.itemSubtasksComplete,
        subTasks: currentTask.subTasks,
      });
    }
  }, [taskId]);

  useEffect(() => {
    const getAllBoards = async () => {
      try {
        const url = "http://localhost:3000/api/boards";
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in the response");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching boards:", error);
        return null;
      }
    };

    const fetchData = async () => {
      const result = await getAllBoards();
      if (result) {
        setAllBoards(result);
        setActiveBoardId(result[0].id);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {});

  return (
    <AppShell
      toggleBoardModal={handleToggleBoardModal}
      allBoards={allBoards}
      activeBoardId={activeBoardId}
      changeActiveBoard={handleChangeActiveBoard}
    >
      {viewTaskModal && (
        <ViewTaskModal
          toggleModal={handleToggleViewTaskModal}
          taskData={taskModalData}
        />
      )}
      {viewBoardModal && (
        <CreateBoardModal
          toggleModal={handleToggleBoardModal}
          createNewBoard={handleCreateNewBoard}
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
