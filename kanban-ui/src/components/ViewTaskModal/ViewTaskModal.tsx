
import { useEffect, useState } from "react";
import { Ticket } from "../../types";
import DropDown from "../DownDown/DropDown";
import Modal from "../Modal/Modal";
import styles from "./ViewTaskModal.module.css";

interface ViewTaskModalProps {
  toggleModal: () => void;
  ticketId: number | null;
}

const ViewTaskModal = ({ toggleModal, ticketId }: ViewTaskModalProps) => {

  const [ticketData, setTicketData] = useState<Ticket | undefined>(undefined);

  useEffect(() => {

    console.log("ticket id is: ", ticketId)

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

  useEffect(() => {
    console.log("ticketData: ", ticketData)
  }, [ticketData])

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
              values={["Doing", "Done"]}
              value="Doing"
              setValue={() => {}}
            />
          </div>
        </>
      )}
    </Modal>
  );
};

export default ViewTaskModal;
