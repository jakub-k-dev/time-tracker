type ButtonVariant = "primary" | "secondary";

const mapVariantToStyles: Record<ButtonVariant, string> = {
  primary:
    "text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2        disabled:bg-indigo-400",
  secondary:
    "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-200",
};

type Props = { variant?: ButtonVariant } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ variant = "primary", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`rounded px-2 py-1 sm:rounded-md sm:px-3.5 sm:py-2.5 text-sm font-semibold shadow-sm ${mapVariantToStyles[variant]}`}
    />
  );
}
