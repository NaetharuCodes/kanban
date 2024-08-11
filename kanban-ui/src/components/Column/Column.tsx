import { ColItem } from "../../types";
import ColorPip from "../ColorPip/ColorPip";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./Column.module.css";

interface ColumnProps {
  colId: string;
  colName: string;
  colColor: string;
  colItems: ColItem[];
}

const Column = ({ colId, colName, colColor, colItems }: ColumnProps) => {
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
            itemId={item.itemId}
            itemName={item.itemName}
            itemSubtask={item.itemSubtasks}
            itemCompleteTasks={item.itemSubtasksComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
