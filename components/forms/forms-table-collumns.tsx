"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeleteForm } from "@/lib/utils/delete-form";
import { ConfirmDialog } from "../ui/confirm-dialog";
import { useTranslations } from "next-intl";

type FormType = {
  id: string;
  updatedAt: Date;
  title: string;
  topic: string;
};

const ActionCell = ({ row }: { row: any }) => {
  const t = useTranslations("DataTable");
  const [open, setOpen] = useState(false);
  const { deleteForm } = useDeleteForm();

  const handleDelete = () => {
    deleteForm(row.original.id);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/forms/${row.original.id}`}>{t("viewForm")}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/forms/${row.original.id}/edit`}>{t("editForm")}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 hover:cursor-pointer"
          >
            {t("deleteForm")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog onConfirm={handleDelete} open={open} setOpen={setOpen} />
    </>
  );
};

export const formsTableColumns: ColumnDef<FormType>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.original.title}</div>,
  },
  {
    accessorKey: "topic",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Topic
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize px-4">{row.original.topic}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last updated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString("lt-LT"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
