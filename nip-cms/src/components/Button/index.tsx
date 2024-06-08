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
}

const NiPButton = ({
  variant = "primary",
  onClick,
  children,
  link,
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
    <button onClick={onClick} className={`${styles.button} ${getColor()}`}>
      {children}
    </button>
  );
  if (link) {
    return <PrismicNextLink field={link}>{button}</PrismicNextLink>;
  }
  return button;
};

export default NiPButton;
