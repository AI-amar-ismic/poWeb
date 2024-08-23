"use client";
import { PaginationPolygonIcon } from "@/assets/icons";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/pagination";
import { useRouter } from "next/navigation";
import styles from "./index.module.scss";

interface PaginationComponentProps {
  page: number;
  total: number;
  baseRoute: string;
}

const PaginationComponent = ({
  page,
  total,
  baseRoute,
}: PaginationComponentProps) => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          onClick={onNext}
          className={`${styles.button} ${styles.navigation}`}
        >
          <PaginationPolygonIcon />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          onClick={onPrevious}
          className={`${styles.mRight} ${styles.button} ${styles.navigation} ${styles.rotatePolygon}`}
        >
          <PaginationPolygonIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button
          key={key}
          className={`${className} ${styles.mRight} ${styles.button}`}
        >
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        onClick={() => setPage(value)}
        className={`${styles.mRight} ${styles.button} ${isActive ? styles.active : ""}`}
      >
        {value}
      </button>
    );
  };

  const router = useRouter();

  return (
    <Pagination
      showControls
      total={total}
      page={page}
      onChange={(page) => router.push(`${baseRoute}?page=${page}`)}
      initialPage={1}
      renderItem={renderItem}
      disableCursorAnimation
      siblings={0}
    />
  );
};

export default PaginationComponent;
