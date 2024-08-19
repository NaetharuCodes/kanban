import { Ticket } from "../../types";
import ColorPip from "../ColorPip/ColorPip";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./Column.module.css";

interface ColumnProps {
  colName: string;
  colColor: string;
  colItems: Ticket[];
  openModal: (taskId: number, colId: number) => void;
}

const Column = ({
  colName,
  colColor,
  colItems = [],
  openModal,
}: ColumnProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} heading-sm`}>
        <ColorPip color={colColor} />
        {colName}
        {` (${colItems.length})`}
      </div>
      <div className={styles.cardContainer}>
        {colItems.map((item) => (
          <ItemCard
            key={item.id}
            itemId={item.id}
            itemName={item.title}
            itemSubtask={[]}
            itemCompleteTasks={
              0
              // item.subtasks.filter((task) => task.status === true).length
            }
            onClick={(taskId: number) => openModal(taskId, item.colId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
