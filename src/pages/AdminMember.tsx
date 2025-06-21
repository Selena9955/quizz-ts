import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { AdminUserData } from "@/types/admin.types";
import { dbChangeRoleByIds, dbGetAllUsers } from "@/api/admin.api";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  type AccessorColumnDef,
  type DisplayColumnDef,
  type GroupColumnDef,
  type RowData,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
    cell: ({ row }) => {
      const role = row.getValue("role");

      const roleColor = {
        USER: "text-gray-700",
        ADMIN: "text-secondary",
        ROOT: "text-primary",
      };

      return (
        <div className={roleColor[role] || "text-muted-foreground"}>{role}</div>
      );
    },
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
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<AdminUserData[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await dbGetAllUsers();
      setUsers(data || []);
    }

    fetchData();
  }, []);

  async function handleRoleChange(event: React.MouseEvent<HTMLDivElement>) {
    const role = event.currentTarget.getAttribute("data-value") as
      | "USER"
      | "ADMIN";
    if (!role) return;
    if (selectedUsers.length === 0) {
      toast.error("請先勾選使用者");
      return;
    }

    const ids = selectedUsers.map((u) => u.id);
    try {
      const resData = await dbChangeRoleByIds(ids, role);
      setUsers(resData || []);
    } catch (err: any) {
      toast.error("修改身分失敗 - " + err.message);
    }
  }

  return (
    <div className="min-h-screen p-2 pr-4 md:p-6">
      <section className="grid md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-semibold text-gray-800">
                {user?.username}
              </div>
              <div className="text-secondary mt-1 text-sm uppercase">
                {user?.role}
              </div>
            </div>
            <div className="text-3xl text-gray-400">🦖</div>
          </div>
        </div>
      </section>
      <section className="mt-5 rounded-md bg-white p-3">
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">切換身分</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuCheckboxItem
                data-value="USER"
                onClick={handleRoleChange}
              >
                USER
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                data-value="ADMIN"
                onClick={handleRoleChange}
              >
                ADMIN
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <DataTable
          data={users}
          columns={columns}
          filterKey="email"
          filterPlaceholder="搜尋 Email..."
          onRowSelectionChange={setSelectedUsers}
        />
      </section>
    </div>
  );
}
