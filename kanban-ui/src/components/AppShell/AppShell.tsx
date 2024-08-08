import BrandIcon from "../Icons/BrandIcon";
import ChevronArrow from "../Icons/ChevronArrow";
import PlusIcon from "../Icons/PlusIcon";
import VerticalPipIcon from "../Icons/VerticalPipIcon";
import styles from "./AppShell.module.css";

interface AppShellProps {
  children: React.ReactNode;
  sideBar?: boolean;
}

const AppShell = ({ children, sideBar }: AppShellProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="flex-row">
          <BrandIcon />
          <div></div>
          <h2 className={`${styles.headerTitle} heading-lg`}>
            Platform Launch
          </h2>
          <ChevronArrow />
        </div>
        <div className="flex-row">
          <button className={styles.button}>
            <PlusIcon />
          </button>
          <button className={styles.pipButton}>
            <VerticalPipIcon />
          </button>
        </div>
      </header>
      {sideBar && <div>Sidebar</div>}
      <div>{children}</div>
    </div>
  );
};

export default AppShell;
