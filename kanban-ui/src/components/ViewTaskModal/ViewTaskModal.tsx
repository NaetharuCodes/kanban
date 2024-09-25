
import { useEffect, useState } from "react";
import { Board, Col, Ticket } from "../../types";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
  ticketId: number | null;
  cols: Col[] | undefined;
  setActiveBoard: React.Dispatch<React.SetStateAction<Board | undefined>>;
}

const ViewTaskModal = ({ toggleModal, ticketId, cols, setActiveBoard }: ViewTaskModalProps) => {

  const [ticketData, setTicketData] = useState<Ticket | undefined>(undefined);

  const handleUpdateTicketStatus = async (id: number) => {
    try {
      const url = `http://localhost:3000/api/tickets/${ticketId}`
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetColId: id
        }),
      });
      if (!response.ok) {
        throw new Error("Error updating ticket status");
      } else {
        setActiveBoard(prevBoard => {
          if (!prevBoard) return prevBoard;
          if (!ticketData) return;
        
          // Find the column that contains the ticket with id ticketData.id
          const oldCol = prevBoard.cols.find(col => col.tickets.some(ticket => ticket.id === ticketData?.id));
          // Find the new column by its id
          const newCol = prevBoard.cols.find(col => col.id === id);
        
          if (!oldCol || !newCol) return prevBoard;  // If either column is not found, don't change anything
        
          return {
            ...prevBoard,
            cols: prevBoard.cols.map((col) => {
              if (col.id === oldCol.id) {
                // Remove the ticket from the old column
                return {
                  ...col,
                  tickets: col.tickets.filter(ticket => ticket.id !== ticketData?.id)
                };
              }
              if (col.id === newCol.id) {
                // Add the ticket to the new column
                return {
                  ...col,
                  tickets: [...col.tickets, ticketData]
                };
              }
              return col;  // Return unchanged for other columns
            })
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const getTaskData = async () => {
      if (!ticketId) return;
      try {
        const url = `http://localhost:3000/api/tickets/${ticketId}`;
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in the response");
        }
        const data = await response.json();
        console.log("Data: ", data);
        setTicketData(data)
      } catch (error) {
        console.error("Error fetching ticket data for modal", error);
        return null;
      }
    }
    getTaskData();
  }, [ticketId])

  if (!cols) return;

  return (
    <Modal toggleModal={toggleModal}>
      {ticketData && (
        <>
          <h2 className={`${styles.heading} heading-lg`}>{ticketData.title}</h2>
          <p className={`${styles.description} text-lg`}>
            {ticketData.text}
          </p>
          <div>
            <div className={styles.dropDownLabel}>Current Status</div>
            <DropDown
              values={cols?.map((col) => col.name)}
              value={cols.find(col => ticketData.colId === col.id)?.name}
              setValue={(option: string) => handleUpdateTicketStatus(cols.find(col => option === col.name)!.id)}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewTaskModal;
