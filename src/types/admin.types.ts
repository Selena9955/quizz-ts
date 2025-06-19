export type AdminUserData = {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN" | "ROOT";
  status: "UNVERIFIED" | "ACTIVE" | "BANNED";
  createTime: string;
  updateTime: string;
};
