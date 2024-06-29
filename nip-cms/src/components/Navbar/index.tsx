"use client";
import { Content, PrismicDocumentWithUID } from "@prismicio/client";
import { NavbarDocumentData, Simplify } from "../../../prismicio-types";
import styles from "./index.module.scss";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import NiPButton from "../Button";
import Submenu from "./Submenu";
import Link from "next/link";
import { HamburguerIcon } from "@/assets/icons";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

interface NavbarProps {
  data: Content.NavbarDocumentData;
}

const Navbar = ({ data }: NavbarProps) => {
  const navbarData = data;

  const renderMenus = () => {
    return (
      <div className={styles.menuItemsContainer}>
        <PrismicNextLink
          field={navbarData.menu_1_link}
          className={styles.menuLink}
        >
          <p className={styles.menuItem}>{navbarData.menu_1_text}</p>
        </PrismicNextLink>
        <Submenu
          menu={navbarData.menu_2_submenus}
          title={navbarData.menu_2_text}
        />
        <Submenu
          menu={navbarData.menu_3_submenus}
          title={navbarData.menu_3_text}
        />
        <PrismicNextLink
          field={navbarData.menu_4_link}
          className={styles.menuLink}
        >
          <p className={styles.menuItem}>{navbarData.menu_4_text}</p>
        </PrismicNextLink>
        <PrismicNextLink
          field={navbarData.menu_5_link}
          className={styles.menuLink}
        >
          <p className={styles.menuItem}>{navbarData.menu_5_text}</p>
        </PrismicNextLink>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <PrismicNextImage field={navbarData.logo} />
        </Link>
        {renderMenus()}
        <div className={styles.buttonsContainer}>
          <NiPButton
            variant="secondaryOutlined"
            link={navbarData.button_1_link}
          >
            {navbarData.button_1_text as string}
          </NiPButton>
          <NiPButton variant="primary" link={navbarData.button_2_link}>
            {navbarData.button_2_text as string}
          </NiPButton>
        </div>
        <HamburgerMenu data={data} />
      </div>
    </div>
  );
};

export default Navbar;
