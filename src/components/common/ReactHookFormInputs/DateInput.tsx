import { Control, FieldValues, Path } from "react-hook-form";

import DateAndTimeInput from "./DateAndTimeInput";

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  errorMessage?: string;
};

export default function DateInput<T extends FieldValues>(props: Props<T>) {
  return <DateAndTimeInput {...props} dateFormat="P" showTimeSelect={false} />;
}
