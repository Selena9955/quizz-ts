import { forwardRef } from "react";
import QuillEditor, { type QuillEditorRef } from "./QuillEditor";
import { Label } from "./ui/label";

type FlashOptEditProps = {
  value: string;
  onChange: (val: string) => void;
};

const FlashOptEdit = forwardRef<QuillEditorRef, FlashOptEditProps>(
  ({ value, onChange }, ref) => {
    return (
      <section>
        <Label className="text-secondary mt-4 mb-2">解答</Label>
        <QuillEditor ref={ref} value={value} onChange={onChange} />
      </section>
    );
  },
);

export default FlashOptEdit;
