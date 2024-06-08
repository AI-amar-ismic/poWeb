import styles from "./index.module.scss";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.input}
      placeholder={placeholder}
    />
  );
};

export default Input;
