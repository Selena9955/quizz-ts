import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

function InputField({
  label,
  description,
  message,
  messageColor = "text-danger",
  ...rest
}: {
  label: string;
  description?: string;
  message?: string;
  messageColor?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label className="font-bold">{label}</Label>
      {description && (
        <p className="text-muted-foreground text-xs">{description}</p>
      )}
      <Input {...rest} />
      {message && <p className={`${messageColor} text-xs`}>{message}</p>}
    </div>
  );
}

export default InputField;
