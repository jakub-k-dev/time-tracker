import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
};

export default function Tile({ children, title, header }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 bg-primary-main shadow-xl rounded-2xl p-8`}
    >
      {(title || header) && (
        <div className="flex justify-between">
          {title && <h3 className="text-xl font-bold">{title}</h3>}
          <div>{header}</div>
        </div>
      )}
      <div className="w-full">{children}</div>
    </div>
  );
}
