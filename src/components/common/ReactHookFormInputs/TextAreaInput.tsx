import { Control, FieldValues, Path } from "react-hook-form";

import FieldWrapper from "./FieldWrapper";

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  placeholder?: string;
  name: Path<T>;
};

export default function TextAreaInput<T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
}: Props<T>) {
  return (
    <FieldWrapper label={label} control={control} name={name}>
      <textarea placeholder={placeholder} />
    </FieldWrapper>
  );
}
