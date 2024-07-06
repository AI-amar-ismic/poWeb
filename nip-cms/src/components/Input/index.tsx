import styles from "./index.module.scss";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variation?: "primary" | "secondary";
  isTextArea?: boolean;
}

const Input = ({
  value,
  onChange,
  placeholder,
  variation,
  isTextArea,
}: InputProps) => {
  const getVariation = () => {
    switch (variation) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      default:
        return "";
    }
  };

  if (isTextArea) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${getVariation()} ${styles.textarea}`}
        placeholder={placeholder}
        rows={5}
        cols={10}
      />
    );
  }

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${styles.input} ${getVariation()}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
