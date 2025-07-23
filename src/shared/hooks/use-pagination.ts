"use client";

import { useState } from "react";
import type {
  DefaultPagination,
  PaginationMeta,
} from "../model/pagination.model";

export function usePagination(
  defaultPagination: DefaultPagination = {
    page: 1,
    limit: 20,
    ignorePagination: false,
  }
) {
  const [pagination, setPagination] =
    useState<DefaultPagination>(defaultPagination);

  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const goToPage = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit }));
  };

  const toggleIgnorePagination = () => {
    setPagination((prev) => ({
      ...prev,
      ignorePagination: !prev.ignorePagination,
    }));
  };

  const updateMeta = (newMeta: PaginationMeta) => {
    setMeta(newMeta);
  };

  const fetchTable = ({
    refetch,
    isRefetch = false,
    page,
    search,
  }: {
    page?: number;
    search?: string;
    refetch?: () => void;
    isRefetch?: boolean;
  }) => {
    if (isRefetch && refetch) {
      refetch();
    }

    if (page) {
      goToPage(page);
    }
    if (search) {
      setPagination((prev) => ({ ...prev, search, page: 1 }));
    }
  };

  return {
    pagination,
    meta,
    goToPage,
    setLimit,
    toggleIgnorePagination,
    updateMeta,
    fetchTable,
  };
}
