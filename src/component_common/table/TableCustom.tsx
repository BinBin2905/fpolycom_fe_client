import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationCustom from "../pagination/PaginationCustom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SearchObjectProduct } from "@/type/TypeCommon";
import SpinnerLoading from "../loading/SpinnerLoading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  search: SearchObjectProduct[];
  isLoading: boolean;
}
const pageSize = 20;
const TableCustom = <TData, TValue>({
  columns,
  data,
  search,
  isLoading = false,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState<number>(0);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination: {
        pageIndex: pageIndex,
        pageSize: pageSize,
      },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3">
        <div className="flex gap-x-2 items-center">
          {search.map((item: SearchObjectProduct) => {
            return (
              <Input
                id={item.key}
                placeholder={`Nhập ${item.name} tìm kiếm...`}
                className="!ring-0 !ring-transparent bg-white min-w-[400px] w-full h-full text-sm"
                onChange={(e) => {
                  table
                    .getColumn(`${item.key}`)
                    ?.setFilterValue(e.target.value);

                  setPageIndex(0);
                }}
              ></Input>
            );
          })}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="rotate-0 hover:rotate-90 transition-transform duration-500 cursor-pointer"
                  onClick={() => {
                    table.resetColumnFilters();
                    table.toggleAllRowsSelected(false);
                    setPageIndex(0);
                  }}
                >
                  <i className="ri-refresh-line text-xl text-gray-500"></i>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-x-2 items-center">
          <div className="flex-1 text-sm text-muted-foreground">
            {pageIndex * pageSize}-
            {pageIndex * pageSize + pageSize >=
            table.getCoreRowModel().rows.length
              ? table.getCoreRowModel().rows.length
              : pageIndex * pageSize + pageSize}{" "}
            trên {table.getCoreRowModel().rows.length} sản phẩm
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto text-gray-600 focus:!ring-0 focus:!ring-transparent text-xs"
                size={"sm"}
              >
                Hiển thị cột <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-white" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="p-2">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <div className="py-5 flex items-center gap-x-3">
              <SpinnerLoading className="w-6 h-6 fill-primary"></SpinnerLoading>{" "}
              <span className="text-gray-500">Đang tải dữ liệu...</span>
            </div>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-r-0 border-l-0"
                key={row.id}

                // data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="!text-gray-600 !p-2 !w-fit"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {table.getFilteredRowModel().rows.length > pageSize && (
        <div className="flex items-center justify-center space-x-2 py-4 mt-5">
          <PaginationCustom
            size={table.getFilteredRowModel().rows.length}
            pageIndex={pageIndex + 1}
            pageSize={pageSize}
            onPageChange={(value) => setPageIndex(value - 1)}
          ></PaginationCustom>
        </div>
      )}
    </div>
  );
};

export default TableCustom;
