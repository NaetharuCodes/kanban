import { Subtask } from "../../types";
import styles from "./ItemCard.module.css";

interface ItemCardProps {
  itemId: number;
  itemName: string;
  itemSubtask: Subtask[];
  itemCompleteTasks: number;
  onClick: (id: number) => void;
}

const ItemCard = ({
  itemId,
  itemName,
  itemSubtask,
  itemCompleteTasks,
  onClick,
}: ItemCardProps) => {

  console.log("The id of this ticket is: ", itemId)

  return (
    <button
      className={styles.container}
      type="button"
      onClick={() => onClick(itemId)}
    >
      <h3 className={`${styles.title} heading-md`}>{itemName}</h3>
      <div className={styles.tasks}>
        {itemCompleteTasks} of {itemSubtask.length} subtasks
      </div>
    </button>
  );
};

export default ItemCard;
