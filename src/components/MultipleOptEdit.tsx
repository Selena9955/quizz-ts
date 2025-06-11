import React from "react";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

function MultipleOptEdit() {
  return (
    <section>
      <Label className="text-secondary mt-4 mb-2">多選題 選項</Label>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Checkbox id="test" />
          <Label htmlFor="test">test</Label>
        </div>
      </div>
    </section>
  );
}

export default MultipleOptEdit;
