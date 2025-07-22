/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import * as React from "react";

import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useScreenSize } from "@/shared/hooks/use-screen-size";
import { ChevronLeft, ChevronRight, RefreshCcw } from "lucide-react";
import { useDebounce } from "../../hooks/use-debounce";
import { cn } from "../../lib/utils";
import type { PaginationMeta } from "../../model/pagination.model";
import { Button } from "../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  onClickRow?: (row: TData) => void;
  selectedRowId?: string | number | null;
  notFoundMessage?: string;
  pagination?: PaginationMeta;
  onFetchData?: (value: {
    page?: number;
    search?: string;
    isRefetch?: boolean;
  }) => void;

  searchMode?: boolean;
  sorting?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
  rowSelection?: Record<string, boolean>;
  setRowSelection?: OnChangeFn<Record<string, boolean>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  onClickRow,
  selectedRowId,
  notFoundMessage = "Nenhum resultado encontrado.",
  pagination,
  onFetchData,
  searchMode = false,
  sorting = [],
  setSorting,
  rowSelection = {},

  setRowSelection,
}: DataTableProps<TData, TValue>) {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 500);

  const tablePaginationState: PaginationState = React.useMemo(
    () => ({
      pageIndex: pagination?.page ? pagination.page - 1 : 0,
      pageSize: pagination?.totalPages ?? 10,
    }),
    [pagination]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: pagination?.totalPages ?? -1,
    state: {
      pagination: tablePaginationState,
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: !!setRowSelection,
  });

  const onNextPage = () => {
    console.log(table.getState().pagination.pageIndex);
    const paginaAtual = table.getState().pagination.pageIndex + 1;
    if (onFetchData) onFetchData({ page: paginaAtual + 1 });
  };
  const onPreviusPage = () => {
    const paginaAtual = table.getState().pagination.pageIndex + 1;
    if (onFetchData) onFetchData({ page: paginaAtual - 1 });
  };

  React.useEffect(() => {
    if (onFetchData)
      onFetchData({
        search: debouncedSearch,
      });
  }, [debouncedSearch]);

  const { isMobile } = useScreenSize();

  return (
    <div className="space-y-4 w-full flex flex-col h-full">
      <div className="flex items-center py-2 w-full justify-end gap-2">
        <Button
          onClick={() => {
            if (onFetchData) onFetchData({ isRefetch: true });
          }}
        >
          <RefreshCcw />
        </Button>
        {searchMode && (
          <Input
            placeholder="Pesquisar..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm self-end"
          />
        )}
      </div>
      <div className="flex-1 overflow-auto rounded-lg border max-h-[calc(100vh-300px)]">
        <Table data-slot="table">
          <TableHeader
            className="sticky top-0 z-10 bg-primary"
            data-slot="table-header"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-white">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-white border-r border-slate-300/20 last:border-r-0"
                    style={{ width: header.getSize() }}
                    data-slot="table-header-cell"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(pagination?.limit)?.map((_, i) => (
                <TableRow key={`skeleton-row-${i}`}>
                  {columns.map((_, j) => (
                    <TableCell key={`skeleton-cell-${j}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    row.getIsSelected() || row.id === selectedRowId
                      ? "selected"
                      : ""
                  }
                  onClick={() => onClickRow && onClickRow(row.original)}
                  className={cn(
                    "text-card-foreground",
                    onClickRow ? "cursor-pointer" : ""
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-card-foreground border-r last:border-r-0"
                    >
                      <Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </Tooltip>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-card-foreground"
                >
                  {notFoundMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center  justify-between space-x-2 flex-wrap gap-2 flex-col-reverse md:flex-row  md:justify-end">
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
          </div>
        )}
        <div className="flex items-center space-x-2 flex-wrap gap-2 justify-center w-full md:w-fit">
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviusPage}
            disabled={!table.getCanPreviousPage()}
          >
            {<ChevronLeft />}
            {!isMobile && <span>Anterior</span>}
          </Button>
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextPage}
            disabled={!table.getCanNextPage()}
          >
            {!isMobile && <span>Próxima</span>}
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
