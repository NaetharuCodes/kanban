import { useState } from "react";
import styles from "./App.module.css";
import KanBanItem from "./components/KanBanItem/KanBanItem";
import data from "./data/data.json";

enum Page {
  PROPOSED = "Proposed",
  ACTIVE = "Active",
  REVIEW = "Review",
  COMPLETE = "Complete",
}

const App = () => {
  const [page, setPage] = useState<Page>(Page.ACTIVE);

  const handleChangePage = (targetPage: Page) => {
    setPage(targetPage);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.kanbanBoard} ${
          page === Page.PROPOSED
            ? "bg-proposed"
            : page === Page.ACTIVE
            ? "bg-active"
            : page === Page.REVIEW
            ? "bg-review"
            : "bg-complete"
        }`}
      >
        <div className={styles.kanbanTabs}>
          <div
            role="button"
            onClick={() => handleChangePage(Page.PROPOSED)}
            className={`${styles.tab} bg-proposed`}
          >
            Proposed
          </div>
          <div
            role="button"
            onClick={() => handleChangePage(Page.ACTIVE)}
            className={`${styles.tab} bg-active`}
          >
            Active
          </div>
          <div
            role="button"
            onClick={() => handleChangePage(Page.REVIEW)}
            className={`${styles.tab} bg-review`}
          >
            Review
          </div>
          <div
            role="button"
            onClick={() => handleChangePage(Page.COMPLETE)}
            className={`${styles.tab} bg-complete`}
          >
            Complete
          </div>
        </div>
        <div className={styles.kanbanContent}>
          {data.tickets.map((ticket) => (
            <KanBanItem ticketNumber={ticket.number} text={ticket.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
