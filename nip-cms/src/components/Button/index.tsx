import { KeyTextField, LinkField } from "@prismicio/client";
import styles from "./index.module.scss";
import { PrismicNextLink } from "@prismicio/next";

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
  link?: LinkField;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const NiPButton = ({
  variant = "primary",
  onClick,
  children,
  link,
  fullWidth,
  disabled,
  type,
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

  const button = (
    <button
      onClick={onClick}
      className={`${styles.button} ${getColor()} ${fullWidth ? styles.fullWidth : ""}`}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
  if (link) {
    return <PrismicNextLink field={link}>{button}</PrismicNextLink>;
  }
  return button;
};

export default NiPButton;
