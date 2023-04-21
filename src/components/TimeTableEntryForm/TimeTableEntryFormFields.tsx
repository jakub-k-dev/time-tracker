import { Control, FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { DateInput, NumberInput, TextAreaInput } from "src/components";

import { FormValues } from "./TimeTableEntryForm";

type Props = {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  errors: Partial<FieldErrorsImpl<Record<keyof FormValues, string>>>;
};

export default function TimeTableEntryFormFields({
  register,
  control,
  errors: { time: timeError, info: infoError },
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        label="Time"
        inputId="time"
        placeholder="time in hours"
        register={register}
        errorMessage={timeError?.message}
      />
      <DateInput label="Date" control={control} inputId="date" />
      <TextAreaInput
        label="Info"
        placeholder="Time info"
        register={register}
        inputId="info"
        errorMessage={infoError?.message}
      />
    </div>
  );
}
