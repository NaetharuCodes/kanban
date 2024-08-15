import AppShell from "./components/AppShell/AppShell";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useEffect, useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { Board } from "./types";
import DeleteBoardModal from "./components/DeleteBoardModal/DeleteBoardModal";

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

function findItemById(data: any, targetId: number) {
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
  // MODAL TOGGLES

  const [viewBoardModal, setViewBoardModal] = useState<boolean>(false);
  const [viewTaskModal, setViewtaskModal] = useState<boolean>(false);
  const [viewDeleteModal, setViewDeleteModal] = useState<boolean>(false);

  const handleToggleViewTaskModal = (id?: number) => {
    setTaskId(id);
    setViewtaskModal(!viewTaskModal);
  };

  const handleToggleBoardModal = () => {
    setViewBoardModal(!viewBoardModal);
  };

  const handleToggleDeleteModal = () => {
    setViewDeleteModal(!viewDeleteModal);
  };

  // MAIN STATE

  const [taskId, setTaskId] = useState<number | undefined>(undefined);
  const [taskModalData, setTaskModalData] = useState<undefined | TaskModalType>(
    undefined
  );
  const [allBoards, setAllBoards] = useState<Board[]>();
  const [activeBoardId, setActiveBoardId] = useState<number | null>(null);
  const [activeBoard, setActiveBoard] = useState<Board | undefined>();

  const handleChangeActiveBoard = (id: number) => {
    setActiveBoardId(id);
    setActiveBoard(
      allBoards ? allBoards.find((board) => board.id === id) : undefined
    );
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
        allBoards
          ? setAllBoards([...allBoards, newBoard])
          : setAllBoards(newBoard);
        setActiveBoardId(newBoard.id);
        setActiveBoard(newBoard);
      }
    } catch (error) {
      console.error("inside the catch", error);
    }

    handleToggleBoardModal();
  };

  const handleDeleteBoard = async () => {
    try {
      const url = `http://localhost:3000/api/boards/${activeBoardId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Error trying to delete board with id ${activeBoardId}`
        );
      } else {
        setAllBoards(allBoards!.filter((entry) => entry.id !== activeBoardId));
        setActiveBoard(allBoards ? allBoards[0] : null);
        handleToggleDeleteModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNewCol = () => {
    const url = "http://localhost:3000/api/cols";
  };

  useEffect(() => {
    if (taskId) {
      const currentTask = findItemById(activeBoard, taskId);
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
        console.log("length of results: ", result.length);
        setActiveBoardId(result.length > 0 ? result[0].id : null);
        setActiveBoard(result.length > 0 ? result[0] : null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("activeBoard has changed: ==> ", activeBoard);
  }, [activeBoard]);

  return (
    <AppShell
      toggleBoardModal={handleToggleBoardModal}
      toggleDeleteModal={handleToggleDeleteModal}
      allBoards={allBoards}
      activeBoardId={activeBoardId}
      changeActiveBoard={handleChangeActiveBoard}
      activeBoardTitle={activeBoard ? activeBoard.name : ""}
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
      {viewDeleteModal && (
        <DeleteBoardModal
          toggleModal={handleToggleDeleteModal}
          title={activeBoard?.name as string}
          cancel={() => {}}
          deleteBoard={handleDeleteBoard}
        />
      )}
      {activeBoard && activeBoard.cols ? (
        <div className={styles.mainContainer}>
          {activeBoard.cols.map((col) => (
            <Column
              openModal={handleToggleViewTaskModal}
              key={col.id}
              colName={col.name}
              colColor={col.color}
              colItems={col.tickets}
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
