import AppShell from "./components/AppShell/AppShell";
import styles from "./App.module.css";
import Column from "./components/Column/Column";
import { useCallback, useEffect, useState } from "react";
import ViewTaskModal from "./components/ViewTaskModal/ViewTaskModal";
import CreateBoardModal from "./components/CreateBoardModal/CreateBoardModal";
import { Board, Ticket } from "./types";
import DeleteBoardModal from "./components/DeleteBoardModal/DeleteBoardModal";
import NewColModal from "./components/NewColModal/NewColModal";
import SideBarModal from "./components/SideBarModal/SideBarModal";
import CreateTaskModal from "./components/CreateTaskModal/CreateTaskModal";
import { FormData } from "./components/CreateTaskModal/CreateTaskModal";

const App = () => {
  // MODAL TOGGLES
  const [modalVisibility, setModalVisibility] = useState({
    viewBoard: false,
    viewTask: false,
    viewDelete: false,
    viewCol: false,
    viewSidebar: false,
    viewCreateTask: false,
  });

  const toggleModal = useCallback((modalName: keyof typeof modalVisibility) => {
    console.log('modal: ', modalName)
    console.log('modal: ', modalVisibility[modalName])
    setModalVisibility(prev => ({...prev, [modalName]: !prev[modalName]}))
  }, [])

  const [taskId, setTaskId] = useState<number | undefined>(8);
  const [taskModalData, setTaskModalData] = useState<Ticket | undefined>(
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

    toggleModal('viewBoard');
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
        toggleModal('viewDelete')
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
    }
    toggleModal('viewCol')
  };

  const handleCreateNewTask = async (
    e: React.FormEvent,
    formData: FormData
  ) => {
    e.preventDefault();
    toggleModal('viewCreateTask')
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
        const newTicket = await response.json();


        setActiveBoard(prevBoard => {

          // handle cases where board is set to null / undefined
          if (!prevBoard) {
            return prevBoard
          }

          // merge ticket in with the active board
          return {
            ...prevBoard,
            cols: prevBoard.cols.map((col) => {
              if (col.id === formData.colId) {
                return {
                  ...col,
                  tickets: [...col.tickets, newTicket]
                }
              }
              return col;
            })
          }
        })
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (taskId) {
      console.log(taskId);
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
  }, [activeBoardId]);

  return (
    <AppShell
      toggleBoardModal={() => toggleModal('viewBoard')}
      toggleDeleteModal={() => toggleModal('viewDelete')}
      toggleSidebarModal={() => toggleModal('viewSidebar')}
      toggleCreateTaskModal={() =>{
        console.log('tasks where are thou')
        toggleModal('viewCreateTask')}}
      allBoards={allBoards}
      activeBoardId={activeBoardId}
      changeActiveBoard={handleChangeActiveBoard}
      activeBoardTitle={activeBoard ? activeBoard.name : ""}
    >
      {modalVisibility.viewTask && (
        <ViewTaskModal
          toggleModal={() => toggleModal('viewTask')}
          ticketId={taskId}
        />
      )}
      {modalVisibility.viewBoard && (
        <CreateBoardModal
          toggleModal={() => toggleModal('viewBoard')}
          createNewBoard={handleCreateNewBoard}
        />
      )}
      {modalVisibility.viewDelete && (
        <DeleteBoardModal
          toggleModal={() => toggleModal('viewDelete')}
          title={activeBoard?.name as string}
          cancel={() => {}}
          deleteBoard={handleDeleteBoard}
        />
      )}
      {modalVisibility.viewCol && (
        <NewColModal
          toggleModal={() => toggleModal('viewCol')}
          createNewCol={handleCreateNewCol}
        />
      )}
      {modalVisibility.viewSidebar && (
        <SideBarModal
          toggleModal={() => toggleModal('viewSidebar')}
          toggleBoardModal={() => toggleModal('viewBoard')}
          allBoards={allBoards}
          activeBoardId={activeBoardId}
          changeActiveBoard={handleChangeActiveBoard}
        />
      )}
      {modalVisibility.viewCreateTask && (
        <CreateTaskModal
          toggleModal={() => {
    
            toggleModal('viewCreateTask')}
          }
          handleCreateNewTask={handleCreateNewTask}
          colZeroId={activeBoard ? activeBoard.cols[0].id : null}
        />
      )}
      {activeBoard?.cols && activeBoard.cols.length > 0 ? (
        <div className={styles.mainContainer}>
          {activeBoard.cols.map((col) => (
            <Column
              openModal={() => toggleModal('viewTask')}
              key={col.id}
              colName={col.name}
              colColor={col.color}
              colItems={col.tickets}
            />
          ))}
          <div className={styles.newColContainer}>
            <button
              className={`${styles.newColBtn} heading-xl`}
              onClick={() => toggleModal('viewCol')}
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
            onClick={() => toggleModal('viewCol')}
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
