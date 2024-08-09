import styles from "./SideBar.module.css";
import SideBarTab from "./SideBarTab";

const SideBar = () => {
  return (
    <div className={styles.container}>
      <SideBarTab
        title="My Board"
        onClick={(value: string) => console.log(value)}
        value="test"
      />
    </div>
  );
};

export default SideBar;
