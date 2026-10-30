"use client";

import { useMemo, useState } from "react";

export function usePagination({
  total,
  pageSize,
  initialPage = 1,
}: {
  total: number;
  pageSize: number;
  initialPage?: number;
}) {
  const [page, setPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);

  const range = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return {
      start,
      end: Math.min(start + pageSize, total),
    };
  }, [currentPage, pageSize, total]);

  return {
    page: currentPage,
    totalPages,
    start: range.start,
    end: range.end,
    goTo: (next: number) =>
      setPage(Math.min(Math.max(next, 1), totalPages)),
    next: () => setPage(Math.min(currentPage + 1, totalPages)),
    previous: () => setPage(Math.max(currentPage - 1, 1)),
    reset: () => setPage(1),
  };
}
