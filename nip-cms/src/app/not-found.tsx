import { NotFoundVector } from "@/assets/vectors";
import Link from "next/link";
import styles from "./notFound.module.scss";
import NiPButton from "@/components/Button";

export default function NotFound() {
  return (
    <div className={styles.layout}>
      <div className={styles.contentContainer}>
        <NotFoundVector />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.text}>
            Ups! Negdje ste pogrešno skrenuli, vratite se na početnu stranicu.
          </p>
          <Link href="/">
            <NiPButton variant="secondaryOutlined">
              VRATI SE NA POČETNU STRANICU
            </NiPButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
