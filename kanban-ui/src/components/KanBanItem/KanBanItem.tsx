import styles from "./KanBanItem.module.css";

interface KanBanItemPropos {
  ticketNumber: string;
  text: string;
}

const KanBanItem = ({ ticketNumber, text }: KanBanItemPropos) => {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <div className={styles.ticketNumber}>{ticketNumber}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>Edit</button>
        <button className={styles.button}>Advance</button>
      </div>
    </div>
  );
};

export default KanBanItem;
