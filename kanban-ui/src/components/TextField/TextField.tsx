import styles from "./TextField.module.css";

interface TextFieldProps {
  placeholder?: string;
  errorMessage?: string;
  error?: boolean;
}

const TextField = ({ placeholder, errorMessage, error }: TextFieldProps) => {
  return (
    <div className={styles.container}>
      <input
        className={`${styles.input} text-lg ${error && styles.error}`}
        type="text"
        placeholder={placeholder}
      />
      {error && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default TextField;
