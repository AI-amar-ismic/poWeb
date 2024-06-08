"use client";
import { PrismicDocumentWithUID } from "@prismicio/client";
import { NavbarDocumentData, Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicNextImage } from "@prismicio/next";
import NiPButton from "../Button";

interface NavbarProps {
  data: Simplify<NavbarDocumentData>;
}

const Navbar = ({ data }: NavbarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PrismicNextImage field={data.logo} />
        <div className={styles.menuItemsContainer}>
          {data.menus.map((menu, i) => (
            <p key={i} className={styles.menuItem}>
              {menu.title}
            </p>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <NiPButton variant="secondaryOutlined" link={data.button_1_link}>
            {data.button_1_text as string}
          </NiPButton>
          <NiPButton variant="primary" link={data.button_2_link}>
            {data.button_2_text as string}
          </NiPButton>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
