import styles from "./ItemCard.module.css";

interface ItemCardProps {
  itemId: string;
  itemName: string;
  itemSubtask: number;
  itemCompleteTasks: number;
  onClick: (id: string) => void;
}

const ItemCard = ({
  itemId,
  itemName,
  itemSubtask,
  itemCompleteTasks,
  onClick,
}: ItemCardProps) => {
  return (
    <button
      className={styles.container}
      type="button"
      onClick={() => onClick(itemId)}
    >
      <h3 className={`${styles.title} heading-md`}>{itemName}</h3>
      <div className={styles.tasks}>
        {itemCompleteTasks} of {itemSubtask} subtasks
      </div>
    </button>
  );
};

export default ItemCard;
