import { sk } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import InputWrapper from "./InputWrapper";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("sk", sk);

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  inputId: Path<T>;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showDateSelect?: boolean;
  isRangePicker?: boolean;
};

export default function DateAndTimeInput<T extends FieldValues>({
  label,
  control,
  inputId,
  dateFormat = "Pp",
  showTimeSelect = true,
  showDateSelect = true,
  isRangePicker,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={inputId}
      render={({ field, fieldState: { error } }) => {
        const errorMessage = error?.message;

        return (
          <InputWrapper
            label={label}
            inputId={inputId}
            errorMessage={errorMessage}
          >
            <DatePicker
              {...field}
              selected={isRangePicker ? field.value[0] : field.value}
              dateFormat={dateFormat}
              locale={sk}
              className={`w-full rounded-md p-2 border-2 ${
                errorMessage ? "border-red-600" : "border-gray-500"
              }`}
              showTimeSelect={showTimeSelect}
              showTimeSelectOnly={!showDateSelect}
              selectsRange={isRangePicker}
              startDate={isRangePicker ? field.value[0] : undefined}
              endDate={isRangePicker ? field.value[1] : undefined}
            />
          </InputWrapper>
        );
      }}
    />
  );
}
