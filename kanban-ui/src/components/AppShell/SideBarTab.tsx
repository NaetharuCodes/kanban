import NewBoardIcon from "../Icons/NewBoardIcon";
import styles from "./SideBarTab.module.css";

interface SideBarTabProps {
  title: string;
  onClick: (value: string) => void;
  value: string;
}

const SideBarTab = ({ title, onClick, value }: SideBarTabProps) => {
  return (
    <button className={styles.container} onClick={() => onClick(value)}>
      <NewBoardIcon fillColor="white" />
      <div className={`${styles.text} heading-md`}>{title}</div>
    </button>
  );
};

export default SideBarTab;
