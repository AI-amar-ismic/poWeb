import { KeyTextField } from "@prismicio/client";
import styles from "./index.module.scss";

interface NiPButtonProps {
  variant?:
    | "primaryOutlined"
    | "primary"
    | "secondary"
    | "secondaryOutlined"
    | "tertiaryOutlined"
    | "tertiary"
    | undefined;
  onClick?: () => void;
  children: React.ReactNode;
}

const NiPButton = ({
  variant = "primary",
  onClick,
  children,
}: NiPButtonProps) => {
  const getColor = () => {
    switch (variant) {
      case "primaryOutlined":
        return styles.primaryOutlined;
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "secondaryOutlined":
        return styles.secondaryOutlined;
      case "tertiaryOutlined":
        return styles.tertiaryOutlined;
      case "tertiary":
        return styles.tertiary;
      default:
        return styles.primary;
    }
  };
  return (
    <button onClick={onClick} className={`${styles.button} ${getColor()}`}>
      {children}
    </button>
  );
};

export default NiPButton;
