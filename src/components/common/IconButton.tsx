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
      className="w-6 h-6 sm:w-8 sm:h-8 rounded-md bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <FontAwesomeIcon icon={icon} className="w-3 h-3 sm:w-4 sm:h-4" />
    </button>
  );
}
