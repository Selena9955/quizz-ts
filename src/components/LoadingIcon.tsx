import { Loader2 } from "lucide-react";

function LoadingIcon() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2">
      <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
      <p>載入中...</p>
    </div>
  );
}

export default LoadingIcon;
