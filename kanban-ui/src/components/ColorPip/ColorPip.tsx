import styles from "./ColorPip.module.css";

interface ColorPipProps {
  color: string;
}

const ColorPip = ({ color }: ColorPipProps) => {
  return (
    <div className={styles.container} style={{ backgroundColor: color }} />
  );
};

export default ColorPip;
