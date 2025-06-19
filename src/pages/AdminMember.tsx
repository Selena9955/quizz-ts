import { DataTable } from "@/components/DataTable";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type AccessorColumnDef,
  type ColumnDef,
  type DisplayColumnDef,
  type GroupColumnDef,
  type RowData,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { dbGetAllUsers } from "@/api/admin.api";
import type { AdminUserData } from "@/types/admin.types";

type Align = "left" | "center" | "right";

// 擴充 columnDef，加入 align 屬性
export type ExtendedColumnDef<TData extends RowData, TValue = unknown> = (
  | AccessorColumnDef<TData, TValue>
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
) & {
  align?: Align;
};

const columns: ExtendedColumnDef<AdminUserData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "用戶名",
    cell: ({ row }) => <div className="">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "email",
    header: "信箱",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    align: "left",
  },
  {
    accessorKey: "role",
    header: "身分",

    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: "狀態",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={status === "banned" ? "text-red-600" : "text-green-600"}
        >
          {status === "banned" ? "停權" : "正常"}
        </span>
      );
    },
  },
  {
    accessorKey: "createTime",
    header: "加入日期",
    cell: ({ row }) => {
      const raw = row.getValue("createTime") as string;
      const date = new Date(raw);
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "updateTime",
    header: "更新日期",
    cell: ({ row }) => {
      const raw = row.getValue("updateTime") as string;
      const date = new Date(raw);
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
      return <div className="text-center">{formatted}</div>;
    },
  },
];

export default function AdminMember() {
  const [users, setUsers] = useState<AdminUserData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await dbGetAllUsers();
      console.log(data);
      setUsers(data || []);
    }

    fetchData();
  }, []);

  return (
    <section className="rounded-md bg-white p-3">
      <DataTable
        data={users}
        columns={columns}
        filterKey="email"
        filterPlaceholder="搜尋 Email..."
      />
    </section>
  );
}
