import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

type Props = {
  label: string;
  inputName?: string;
  children: ReactNode;
  errorMessage?: string;
};

export default function InputWrapper({
  children,
  label,
  inputName,
  errorMessage,
}: Props) {
  return (
    <div className="flex flex-col grow">
      <label
        className="flex select-none items-center justify-between p-2"
        htmlFor={inputName}
      >
        <span>{label}</span>
        {errorMessage && (
          <span className="text-red-600">
            <FontAwesomeIcon icon="circle-exclamation" /> {errorMessage}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
