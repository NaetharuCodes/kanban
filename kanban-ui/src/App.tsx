import AppShell from "./components/AppShell/AppShell";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useEffect, useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { Board } from "./types";
import DeleteBoardModal from "./components/DeleteBoardModal/DeleteBoardModal";
import NewColModal from "./components/NewColModal/NewColModal";
import SideBarModal from "./components/SideBarModal/SideBarModal";
import CreateTaskModal from "./components/CreateTaskModal/CreateTaskModal";
import { FormData } from "./components/CreateTaskModal/CreateTaskModal";

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
  const [viewColModal, setViewColModal] = useState<boolean>(false);
  const [viewSidebarModal, setViewSidebarModal] = useState<boolean>(false);
  const [viewCreateTaskModal, setViewCreateTaskModal] =
    useState<boolean>(false);

  const handleToggleViewTaskModal = (id?: number) => {
    setTaskId(id);
    setViewtaskModal(!viewTaskModal);
  };

  const handleToggleBoardModal = () => {
    setViewBoardModal(!viewBoardModal);
    setViewSidebarModal(false);
  };

  const handleToggleDeleteModal = () => {
    setViewDeleteModal(!viewDeleteModal);
  };

  const handleToggleColModal = () => {
    setViewColModal(!viewColModal);
  };

  const handleToggleSidebarModal = () => {
    setViewSidebarModal(!viewSidebarModal);
  };

  const handleToggleCreateTaskModal = () => {
    setViewCreateTaskModal(!viewCreateTaskModal);
  };

  // MAIN STATE

  const [taskId, setTaskId] = useState<number | undefined>(undefined);
  const [taskModalData, setTaskModalData] = useState<undefined | TaskModalType>(
    undefined
  );
  const [allBoards, setAllBoards] = useState<Board[]>();
  const [activeBoardId, setActiveBoardId] = useState<number | null>(null);
  const [activeBoard, setActiveBoard] = useState<Board | undefined>();

  const getAllBoards = () => {
    const getAllBoardData = async () => {
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
      const result = await getAllBoardData();
      if (result) {
        setAllBoards(result);
        if (!activeBoardId) {
          if (result.length > 0) {
            setActiveBoardId(result[0].id);
            setActiveBoard(result[0]);
          } else {
            setActiveBoardId(null);
            setActiveBoard(undefined);
          }
        }
      }
    };

    fetchData();
  };

  const getActiveBoard = async () => {
    try {
      const url = `http://localhost:3000/api/boards/${activeBoardId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error getting cols");
      } else {
        const newBoard = await response.json();
        setActiveBoard(newBoard);
      }
    } catch (error) {
      console.error("error");
    }
  };

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
        setActiveBoardId(null);
        handleToggleDeleteModal();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateNewCol = async (
    e: React.FormEvent,
    name: string,
    color: string
  ) => {
    e.preventDefault();
    const url = "http://localhost:3000/api/cols";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardId: activeBoardId,
        name: name,
        color: color,
      }),
    });
    if (!response.ok) {
      throw new Error("Error in the col response");
    } else {
      getActiveBoard();
    }
    handleToggleColModal();
  };

  const handleCreateNewTask = async (
    e: React.FormEvent,
    formData: FormData
  ) => {
    e.preventDefault();
    handleToggleCreateTaskModal();
    try {
      const url = "http://localhost:3000/api/tickets";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          text: formData.text,
          colId: formData.colId,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating new ticket");
      } else {
        getActiveBoard();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (taskId) {
      const currentTask = findItemById(activeBoard, taskId);

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
    getAllBoards();
  }, [activeBoardId]);

  return (
    <AppShell
      toggleBoardModal={handleToggleBoardModal}
      toggleDeleteModal={handleToggleDeleteModal}
      toggleSidebarModal={handleToggleSidebarModal}
      toggleCreateTaskModal={handleToggleCreateTaskModal}
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
      {viewColModal && (
        <NewColModal
          toggleModal={handleToggleColModal}
          createNewCol={handleCreateNewCol}
        />
      )}
      {viewSidebarModal && (
        <SideBarModal
          toggleModal={handleToggleSidebarModal}
          toggleBoardModal={handleToggleBoardModal}
          allBoards={allBoards}
          activeBoardId={activeBoardId}
          changeActiveBoard={handleChangeActiveBoard}
        />
      )}
      {viewCreateTaskModal && (
        <CreateTaskModal
          toggleModal={handleToggleCreateTaskModal}
          handleCreateNewTask={handleCreateNewTask}
          colZeroId={activeBoard ? activeBoard.cols[0].id : null}
        />
      )}
      {activeBoard?.cols && activeBoard.cols.length > 0 ? (
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
            <button
              className={`${styles.newColBtn} heading-xl`}
              onClick={handleToggleColModal}
            >
              + New Column
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.noColsContainer}>
          <p className={`${styles.noColsText} heading-lg`}>
            This board is empty. Createa a new column to get started.
          </p>
          <button
            className={`${styles.noColsBtn} heading-md`}
            onClick={handleToggleColModal}
            disabled={!activeBoardId}
          >
            + Add New Column
          </button>
        </div>
      )}
    </AppShell>
  );
};

export default App;
