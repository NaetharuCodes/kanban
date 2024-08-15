import styles from "./MainButtom.module.css";

enum Buttons {
  Primary = "primary",
  Secondary = "secondary",
  Destructive = "destructive",
}

interface MainButtonProps {
  text: string;
  onClick?: () => void;
  type: string;
  large?: boolean;
  disabled?: boolean;
}

const MainButton = ({
  text,
  onClick,
  type,
  large,
  disabled,
}: MainButtonProps) => {
  return (
    <button
      className={`${styles.button} ${
        type === Buttons.Primary
          ? styles.primary
          : type === Buttons.Secondary
          ? styles.secondary
          : styles.destructive
      } ${large && styles.large}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default MainButton;
