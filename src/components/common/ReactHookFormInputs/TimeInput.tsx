import { Control, FieldValues, Path } from "react-hook-form";

import DateAndTimeInput from "./DateAndTimeInput";

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  inputId: Path<T>;
  errorMessage?: string;
};

export default function TimeInput<T extends FieldValues>(props: Props<T>) {
  return <DateAndTimeInput {...props} dateFormat="p" showDateSelect={false} />;
}
