"use client";
import { PaginationPolygonIcon } from "@/assets/icons";
import {
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@nextui-org/pagination";
import { useRouter } from "next/navigation";

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
        <button key={key} onClick={onNext}>
          <PaginationPolygonIcon />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button key={key} onClick={onPrevious}>
          <PaginationPolygonIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button key={key} ref={ref} onClick={() => setPage(value)}>
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
    />
  );
};

export default PaginationComponent;
