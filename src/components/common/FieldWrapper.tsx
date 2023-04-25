import { cloneElement, ReactElement, useEffect, useRef } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

import InputWrapper from "./ReactHookFormInputs/InputWrapper";

const className =
  "w-full rounded-md p-2 border-2 border-gray-500 invalid:border-red-600";

type Props<T extends FieldValues> = {
  label: string;
  children: ReactElement;
  name: Path<T>;
  control: Control<T>;
};

export default function FieldWrapper<T extends FieldValues>({
  label,
  name,
  children,
  control,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={(renderProps) => (
        <RenderedWrapper {...renderProps} label={label} children={children} />
      )}
    />
  );
}

type RenderProps<T extends FieldValues> = Parameters<
  ControllerProps<T>["render"]
>[0];

type RenderedWrapperProps<T extends FieldValues> = {
  children: ReactElement;
  label: string;
} & RenderProps<T>;

const RenderedWrapper = <T extends FieldValues>({
  field: { ref, name, ...restField },
  fieldState: { error },
  label,
  children,
}: RenderedWrapperProps<T>) => {
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error?.message) {
      innerRef.current?.setCustomValidity(error.message);
    } else {
      innerRef.current?.setCustomValidity("");
    }
    innerRef.current?.checkValidity();
  }, [error?.message]);

  const refFunc = (e: HTMLInputElement) => {
    if (typeof ref === "function") {
      ref(e);
    }
    innerRef.current = e;
  };

  return (
    <InputWrapper label={label} inputName={name} errorMessage={error?.message}>
      {cloneElement(children, { className, ref: refFunc, name, ...restField })}
    </InputWrapper>
  );
};
