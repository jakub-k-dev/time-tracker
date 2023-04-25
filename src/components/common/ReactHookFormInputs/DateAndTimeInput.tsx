import { sk } from "date-fns/locale";
import { forwardRef, useMemo } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Control, FieldValues, Path } from "react-hook-form";

import FieldWrapper from "./FieldWrapper";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("sk", sk);

type Props<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showDateSelect?: boolean;
  isRangePicker?: boolean;
};

export default function DateAndTimeInput<T extends FieldValues>({
  label,
  control,
  name,
  dateFormat = "Pp",
  showTimeSelect = true,
  showDateSelect = true,
  isRangePicker,
}: Props<T>) {
  return (
    <FieldWrapper label={label} name={name} control={control}>
      {({ field, className, ref }) => {
        const CustomInput = useMemo(
          () =>
            forwardRef((props, datePickerRef) => (
              <input
                {...props}
                ref={(e) => {
                  if (typeof datePickerRef === "function") {
                    datePickerRef!(e);
                  }
                  e && ref(e);
                }}
              />
            )),
          []
        );
        return (
          <DatePicker
            {...field}
            customInput={<CustomInput />}
            className={className}
            selected={isRangePicker ? field.value[0] : field.value}
            dateFormat={dateFormat}
            locale={sk}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={!showDateSelect}
            selectsRange={isRangePicker}
            startDate={isRangePicker ? field.value[0] : undefined}
            endDate={isRangePicker ? field.value[1] : undefined}
          />
        );
      }}
    </FieldWrapper>
  );
}
