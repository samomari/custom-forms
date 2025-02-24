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
import { useDeleteTemplate } from "@/lib/utils/delete-template";
import { ConfirmDialog } from "../ui/confirm-dialog";
import { useState } from "react";
import { useTranslations } from "next-intl";

type TemplateType = {
  id: string;
  updatedAt: Date;
  title: string;
  topic: string;
  likeCount: number;
  formCount: number;
};

const ActionCell = ({ row }: { row: any }) => {
  const t = useTranslations("DataTable");
  const [open, setOpen] = useState(false);
  const { deleteTemplate } = useDeleteTemplate();
  const handleDelete = () => {
    deleteTemplate(row.original.id);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
          {row.original.formCount > 0 && (
            <DropdownMenuItem>
              <Link href={`/templates/${row.original.id}/forms`}>
                {t("formsList")}
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href={`/templates/${row.original.id}`}>
              {t("viewTemplate")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/templates/${row.original.id}/edit`}>
              {t("editTemplate")}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 hover:cursor-pointer"
          >
            {t("deleteTemplate")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog onConfirm={handleDelete} open={open} setOpen={setOpen} />
    </div>
  );
};

export const templatesTableColumns: ColumnDef<TemplateType>[] = [
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
    cell: ({ row }) => (
      <div className="md:max-w-[200px] lg:max-w-[400px] truncate">
        {row.original.title}
      </div>
    ),
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
    accessorKey: "likeCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-16">{row.original.likeCount}</div>,
  },
  {
    accessorKey: "formCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Forms Count
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-16">{row.original.formCount}</div>,
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
