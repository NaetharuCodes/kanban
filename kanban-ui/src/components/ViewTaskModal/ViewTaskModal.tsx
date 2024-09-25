
import { useEffect, useState } from "react";
import { Col, Ticket } from "../../types";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
  ticketId: number | null;
  cols: Col[] | undefined;
}

const ViewTaskModal = ({ toggleModal, ticketId, cols }: ViewTaskModalProps) => {

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
        console.log('done')
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
