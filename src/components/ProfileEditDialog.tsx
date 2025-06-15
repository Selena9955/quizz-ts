import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components//ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { ProfileData, ProfileFormData } from "@/types/auth.types";
import { toast } from "sonner";

type ProfileEditDialogProps = {
  profileData: ProfileData;
};
function ProfileEditDialog({ profileData }: ProfileEditDialogProps) {
  const { user } = useAuth();
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    id: 0,
    username: "",
    bio: "",
    avatarUrl: "",
    bgUrl: "/default-bg.jpg",
  });

  useEffect(() => {
    setProfileForm({
      id: profileData.id,
      username: profileData.username,
      bio: profileData.bio,
      avatarUrl: profileData.avatarUrl,
      bgUrl: profileData.bgUrl,
    });
  }, [profileData]);

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "bgUrl" | "avatarUrl",
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 檢查檔案類型是否為圖片
    if (file && !file.type.startsWith("image/")) {
      toast.error("請選擇圖片類型檔案");
      return;
    }

    if (file) {
      // Convert image to base64.
      const reader = new FileReader();
      reader.readAsDataURL(file);

      // onload 會在成功讀取文件時觸發
      reader.onload = async () => {
        const base64Image = reader.result;
        setProfileForm((prev) => ({
          ...prev,
          [field]: base64Image as string,
        }));
      };
      reader.onerror = (error) => {
        console.error("轉換img失敗：", error);
        toast.error("[error] 圖片檔案轉檔失敗");
      };
    }
  }

  function handleFormChange<K extends keyof ProfileFormData>(
    key: K,
    value: ProfileFormData[K],
  ) {
    setProfileForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function handleSave() {
    console.log(profileForm);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">編輯檔案</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>編輯個人檔案</DialogTitle>
          <DialogDescription>更新你的頭像、暱稱與簡介</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="group relative block h-50 cursor-pointer overflow-hidden rounded-md">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "bgUrl")}
                className="hidden"
              />
              <img
                src={profileForm.bgUrl || "/default-bg.jpg"}
                alt="profile-bg"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 hidden items-center justify-center bg-black/30 text-white group-hover:flex">
                <Camera className="h-6 w-6" />
              </div>
            </label>
            <div className="relative pb-20">
              <label className="group absolute -top-10 left-1/2 -translate-x-1/2 cursor-pointer md:-top-16">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "avatarUrl")}
                  className="hidden"
                />
                <Avatar className="border-2 border-white md:size-32">
                  <AvatarImage src={profileForm.avatarUrl} />
                  <AvatarFallback>err</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 hidden items-center justify-center rounded-full bg-black/30 text-white group-hover:flex">
                  <Camera className="h-5 w-5" />
                </div>
              </label>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">使用者名稱</label>
            <Input
              maxLength={50}
              value={profileForm.username}
              onChange={(e) => handleFormChange("username", e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">個人簡介</label>
            <Textarea
              rows={4}
              maxLength={200}
              value={profileForm.bio}
              onChange={(e) => handleFormChange("bio", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>儲存變更</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEditDialog;
