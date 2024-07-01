import { HamburguerIcon, PolygonIcon } from "@/assets/icons";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./index.module.scss";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";
import NiPButton from "@/components/Button";

interface IHamburgerMenuProps {
  data: Content.NavbarDocumentData;
}

const HamburgerMenu = ({ data }: IHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const renderMenus = () => {
    return (
      <div className={styles.menuItemsContainer}>
        <PrismicNextLink
          field={data.menu_1_link}
          className={styles.menuLink}
          onClick={handleClose}
        >
          <p className={styles.menuItem}>{data.menu_1_text}</p>
        </PrismicNextLink>
        <div className={styles.submenuContainer}>
          <p className={styles.menuItem}>{data.menu_2_text}</p>
          {data.menu_2_submenus.map((item, index) => (
            <PrismicNextLink
              field={item.link}
              className={styles.menuLink}
              key={`${index}-menu2`}
              onClick={handleClose}
            >
              <PolygonIcon />
              <p className={styles.submenuItem}>{item.title}</p>
            </PrismicNextLink>
          ))}
        </div>
        <div className={styles.submenuContainer}>
          <p className={styles.menuItem}>{data.menu_3_text}</p>
          {data.menu_3_submenus.map((item, index) => (
            <PrismicNextLink
              field={item.link}
              className={styles.menuLink}
              key={`${index}-menu3`}
              onClick={handleClose}
            >
              <PolygonIcon />
              <p className={styles.submenuItem}>{item.title}</p>
            </PrismicNextLink>
          ))}
        </div>
        <PrismicNextLink
          field={data.menu_4_link}
          className={styles.menuLink}
          onClick={handleClose}
        >
          <p className={styles.menuItem}>{data.menu_4_text}</p>
        </PrismicNextLink>
        <PrismicNextLink
          field={data.menu_5_link}
          className={styles.menuLink}
          onClick={handleClose}
        >
          <p className={styles.menuItem}>{data.menu_5_text}</p>
        </PrismicNextLink>
      </div>
    );
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
      <Dialog.Trigger asChild className={styles.trigger}>
        <div>
          <HamburguerIcon isOpen={isOpen} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className={styles.content}>
          {renderMenus()}
          <div className={styles.buttonsContainer}>
            <NiPButton
              variant="secondaryOutlined"
              link={data.button_1_link}
              fullWidth
            >
              {data.button_1_text as string}
            </NiPButton>
            <NiPButton variant="primary" link={data.button_2_link} fullWidth>
              {data.button_2_text as string}
            </NiPButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default HamburgerMenu;
