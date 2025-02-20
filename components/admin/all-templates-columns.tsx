"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { useDeleteTemplate } from "@/lib/utils/delete-template";
import { useState } from "react";
import { ConfirmDialog } from "../ui/confirm-dialog";

type TemplateType = {
  id: string;
  updatedAt: Date;
  title: string;
  topic: string;
  likeCount: number;
  formCount: number;
  username: string;
};

const ActionCell = ({ row }: { row: any }) => {
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={`/templates/${row.original.id}`}>View Template</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/templates/${row.original.id}/edit`}>
              Edit Template
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 hover:cursor-pointer"
          >
            Delete Template
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDialog
        title="Are you sure?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export const allTemplatesColumns: ColumnDef<TemplateType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Template ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.id}</div>,
  },
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
      <div className="px-4 md:max-w-[200px] lg:max-w-[400px] truncate">
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.original.username}</div>,
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
    cell: ({ row }) => (
      <div className="px-2">
        {new Date(row.original.updatedAt).toLocaleString("lt-LT")}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
