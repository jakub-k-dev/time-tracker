import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconProp;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function IconButton({ icon, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="w-8 h-8 p-1 bg-secondary-main hover:bg-secondary-alt rounded-md"
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
