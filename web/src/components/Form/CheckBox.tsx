import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { SetStateAction, Dispatch } from "react";

interface ICheckBox extends Checkbox.CheckboxProps {
  label?: string;
  isCheck: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
}

export default function CheckBox({ label, isCheck, setIsCheck }: ICheckBox) {
  return (
    <label className="flex gap-2 items-center text-sm">
      <Checkbox.Root
        onCheckedChange={() => setIsCheck(!isCheck)}
        checked={isCheck}
        className="w-6 h-6 p-1 rounded bg-zinc-900"
      >
        <Checkbox.Indicator>
          <Check className="w-4 h-4 text-emerald-400" weight="bold" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </label>
  );
}
