import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string | null;
  header?: ReactNode;
};

export default function Tile({ children, title, header }: Props) {
  return (
    <div
      className={`flex flex-col gap-4 bg-gray-300 shadow-xl rounded-2xl p-8 h-full`}
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
