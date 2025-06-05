import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

function InputField({
  label,
  description,
  message,
  messageColor = "text-danger",
  labelClassName,
  inputClassName,
  ...rest
}: {
  label: string;
  description?: string;
  message?: string;
  messageColor?: string;
  labelClassName?: string;
  inputClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label className={cn("font-bold", labelClassName)}>{label}</Label>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
      <Input {...rest} className={inputClassName} />
      {message && <p className={`${messageColor} text-xs`}>{message}</p>}
    </div>
  );
}

export default InputField;
