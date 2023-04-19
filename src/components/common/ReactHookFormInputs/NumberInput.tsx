import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import InputWrapper from "./InputWrapper";

type Props<T extends FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  placeholder?: string;
  inputId: Path<T>;
  errorMessage?: string;
};

export default function NumberInput<T extends FieldValues>({
  label,
  register,
  placeholder,
  inputId,
  errorMessage,
}: Props<T>) {
  return (
    <InputWrapper label={label} inputId={inputId} errorMessage={errorMessage}>
      <input
        type="number"
        placeholder={placeholder}
        className={`w-full rounded-md p-2 border-2 ${
          errorMessage ? "border-red-600" : "border-gray-500"
        }`}
        {...register(inputId)}
      />
    </InputWrapper>
  );
}
