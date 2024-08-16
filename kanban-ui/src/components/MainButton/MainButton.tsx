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
  style?: React.CSSProperties;
}

const MainButton = ({
  text,
  onClick,
  type,
  large,
  disabled,
  style,
}: MainButtonProps) => {
  return (
    <button
      style={style}
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
