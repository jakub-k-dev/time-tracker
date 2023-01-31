type ButtonVariant = "primary" | "secondary";

const mapVariantToStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-main text-primary-text hover:bg-primary-alt border-secondary-main disabled:bg-primary-alt",
  secondary:
    "bg-secondary-main text-secondary-text hover:bg-secondary-alt border-primary-main disabled:bg-secondary-alt",
};

type Props = { variant?: ButtonVariant } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ variant = "primary", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`py-3 px-4 rounded-md border-2 ${mapVariantToStyles[variant]}`}
    />
  );
}
