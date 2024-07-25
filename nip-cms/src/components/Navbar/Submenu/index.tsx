import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./index.module.scss";
import { Simplify } from "../../../../prismicio-types";
import { ChevronDownIcon, PolygonIcon } from "@/assets/icons";
import { Content, GroupField, KeyTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";

const Submenu = ({
  menu,
  title,
}: {
  menu: GroupField<Simplify<Content.NavbarDocumentDataMenu2SubmenusItem>>;
  title: KeyTextField;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu.Root onOpenChange={(e) => setIsOpen(e)} open={isOpen}>
      <DropdownMenu.Trigger asChild>
        <div
          className={`${styles.menuContainer} ${isOpen ? styles.border : ""}`}
        >
          <p className={styles.menuItem}>{title}</p>
          <ChevronDownIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.dropdownContent}
          align="start"
          sideOffset={10}
        >
          {menu.map((item, index) => (
            <PrismicNextLink
              field={item.link}
              onClick={() => setIsOpen(false)}
              className={styles.submenuItemContainer}
              key={index}
            >
              <PolygonIcon />
              <p className={styles.submenuItem}>{item.title}</p>
            </PrismicNextLink>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Submenu;
