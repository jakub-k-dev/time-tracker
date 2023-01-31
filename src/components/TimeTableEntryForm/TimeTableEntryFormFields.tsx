import { FieldErrorsImpl, UseFormRegister } from "react-hook-form/dist/types";
import { DateInput, NumberInput, TextAreaInput } from "src/components";

import { FormValues } from "./TimeTableEntryForm";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<Record<keyof FormValues, string>>>;
};

export default function TimeTableEntryFormFields({
  register,
  errors: { time: timeError, info: infoError },
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <NumberInput
        label="Time (in hours)"
        inputId="time"
        placeholder="Title"
        register={register}
        errorMessage={timeError?.message}
      />
      <DateInput label="Date" register={register} inputId="date" />
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
