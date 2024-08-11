import styles from "./ItemCard.module.css";

interface ItemCardProps {
  itemId: string;
  itemName: string;
  itemSubtask: number;
  itemCompleteTasks: number;
}

const ItemCard = ({
  itemId,
  itemName,
  itemSubtask,
  itemCompleteTasks,
}: ItemCardProps) => {
  return (
    <button
      className={styles.container}
      type="button"
      onClick={() => console.log(itemId)}
    >
      <h3 className={`${styles.title} heading-md`}>{itemName}</h3>
      <div className={styles.tasks}>
        {itemCompleteTasks} of {itemSubtask} subtasks
      </div>
    </button>
  );
};

export default ItemCard;
