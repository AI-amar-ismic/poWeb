import { PrismicDocumentWithUID } from "@prismicio/client";
import { NavbarDocumentData, Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicNextImage } from "@prismicio/next";

interface NavbarProps {
  data: Simplify<NavbarDocumentData>;
}

const Navbar = ({ data }: NavbarProps) => {
  return (
    <div className={styles.container}>
      <PrismicNextImage field={data.logo} />

      {data.menus.map((menu, i) => (
        <p key={i}>{menu.title}</p>
      ))}
    </div>
  );
};

export default Navbar;
