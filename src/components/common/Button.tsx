type ButtonVariant = "primary" | "secondary";

const mapVariantToStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-main text-primary-text hover:bg-primary-alt border-secondary-main",
  secondary: "bg-secondary-main hover:bg-secondary-alt border-primary-main",
};

type Props = { variant?: ButtonVariant } & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({ variant = "primary", ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`w-24 h-12 rounded-md border-2 ${mapVariantToStyles[variant]}`}
    />
  );
}
