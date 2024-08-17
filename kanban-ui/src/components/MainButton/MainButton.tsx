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
  buttonType: "button" | "submit" | "reset";
}

const MainButton = ({
  text,
  onClick,
  type,
  large,
  disabled,
  style,
  buttonType,
}: MainButtonProps) => {
  return (
    <button
      type={buttonType}
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
