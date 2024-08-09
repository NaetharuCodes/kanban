import NewBoardIcon from "../Icons/NewBoardIcon";
import styles from "./SideBarTab.module.css";

interface SideBarTabProps {
  title: string;
  onClick: (value: string) => void;
  value: string;
  active?: boolean;
}

const SideBarTab = ({ title, onClick, value, active }: SideBarTabProps) => {
  return (
    <button
      type="button"
      className={`${styles.container} ${active && styles.active}`}
      onClick={() => onClick(value)}
    >
      <NewBoardIcon fillColor={active ? "white" : "#828fa3"} />
      <div className={`${styles.text} heading-md`}>{title}</div>
    </button>
  );
};

export default SideBarTab;
