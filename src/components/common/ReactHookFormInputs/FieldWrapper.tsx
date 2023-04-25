import {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";

import InputWrapper from "./InputWrapper";

const className =
  "w-full rounded-md p-2 border-2 border-gray-500 invalid:border-red-600";

type RenderProps<T extends FieldValues> = Parameters<
  ControllerProps<T>["render"]
>[0];

type FunctionChild<T extends FieldValues> = (
  props: RenderProps<T>
) => ReactNode;

type Props<T extends FieldValues> = {
  label: string;
  children: ReactElement | FunctionChild<T>;
  name: Path<T>;
  control: Control<T>;
};

export default function FieldWrapper<T extends FieldValues>({
  name,
  control,
  ...rest
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={(renderProps) => <RenderedWrapper {...renderProps} {...rest} />}
    />
  );
}

type RenderedWrapperProps<T extends FieldValues> = {
  children: ReactElement | FunctionChild<T>;
  label: string;
} & RenderProps<T>;

const RenderedWrapper = <T extends FieldValues>({
  field,
  field: { ref, name, ...restField },
  fieldState,
  fieldState: { error },
  formState,
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
      {isValidElement(children)
        ? cloneElement(children as ReactElement, {
            className,
            ref: refFunc,
            name,
            ...restField,
          })
        : (children as FunctionChild<T>)({
            field,
            fieldState,
            formState,
          })}
    </InputWrapper>
  );
};
