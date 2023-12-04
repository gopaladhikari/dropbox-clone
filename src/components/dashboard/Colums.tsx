"use client";

import { FileType } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import prettyBytes from "pretty-bytes";
import { FileIcon } from "react-file-icon";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue }) => {
      const type = renderValue() as string;
      const extension = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon extension={extension} />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "FileName",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue }) => (
      <span> {prettyBytes(renderValue() as number)} </span>
    ),
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue }) => (
      <Link
        className="underline text-blue-400 hover:text-blue-600"
        href={(renderValue() as string) || "#"}
        target="_blank"
      >
        Download
      </Link>
    ),
  },
];
