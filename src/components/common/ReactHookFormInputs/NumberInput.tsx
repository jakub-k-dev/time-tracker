import { Control, FieldValues, Path } from "react-hook-form";

import FieldWrapper from "./FieldWrapper";

type Props<T extends FieldValues> = {
  label: string;
  placeholder?: string;
  name: Path<T>;
  control: Control<T>;
};

export default function NumberInput<T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
}: Props<T>) {
  return (
    <FieldWrapper control={control} name={name} label={label}>
      <input type="number" placeholder={placeholder} />
    </FieldWrapper>
  );
}
