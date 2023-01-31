import { FieldValues, Path, UseFormRegister } from "react-hook-form";

import InputWrapper from "./InputWrapper";

type Props<T extends FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  inputId: Path<T>;
  errorMessage?: string;
};

export default function DateInput<T extends FieldValues>({
  label,
  register,
  inputId,
  errorMessage,
}: Props<T>) {
  return (
    <InputWrapper label={label} inputId={inputId} errorMessage={errorMessage}>
      <input
        type="date"
        className={`w-full rounded-md p-2 ${
          errorMessage ? "border-red-600 border-2" : ""
        }`}
        {...register(inputId)}
      />
    </InputWrapper>
  );
}
