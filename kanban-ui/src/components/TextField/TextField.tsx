import styles from "./TextField.module.css";

interface TextFieldProps {
  placeholder?: string;
  errorMessage?: string;
  error?: boolean;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  placeholder,
  errorMessage,
  error,
  label,
  value,
  onChange,
}: TextFieldProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} text-lg ${error && styles.error}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
      />
      {error && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default TextField;
