import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import FieldWrapper from "./FieldWrapper";

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  placeholder?: string;
  name: Path<T>;
  type?: HTMLInputTypeAttribute;
};

export default function Input<T extends FieldValues>({
  label,
  control,
  placeholder,
  name,
  type = "text",
}: Props<T>) {
  return (
    <FieldWrapper label={label} control={control} name={name}>
      <input type={type} placeholder={placeholder} />
    </FieldWrapper>
  );
}
