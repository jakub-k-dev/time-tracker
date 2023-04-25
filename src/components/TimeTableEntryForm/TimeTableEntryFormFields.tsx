import { Control } from "react-hook-form";
import { DateInput, Input, TextAreaInput } from "src/components";

import { FormValues } from "./TimeTableEntryForm";

type Props = {
  control: Control<FormValues>;
};

export default function TimeTableEntryFormFields({ control }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        label="Time"
        name="time"
        placeholder="time in hours"
        control={control}
        type="number"
      />
      <DateInput label="Date" control={control} name="date" />
      <TextAreaInput
        label="Info"
        placeholder="Time info"
        control={control}
        name="info"
      />
    </div>
  );
}
