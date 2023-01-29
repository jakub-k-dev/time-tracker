import { ReactNode } from "react";

type GridRowRange = 1 | 2 | 3 | 4 | 5 | 6;
type GridColRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type Props = {
  children: ReactNode;
  title?: string;
  header?: ReactNode;
  xSize?: GridColRange;
  ySize?: GridRowRange;
};

const mapYsizeToGridRowClass = (size: GridRowRange) =>
  ({
    1: "row-span-1",
    2: "row-span-2",
    3: "row-span-3",
    4: "row-span-4",
    5: "row-span-5",
    6: "row-span-6",
  }[size]);

const mapXsizeToGridColClass = (size: GridColRange) =>
  ({
    1: "row-col-1",
    2: "row-col-2",
    3: "row-col-3",
    4: "row-col-4",
    5: "row-col-5",
    6: "row-col-6",
    7: "row-col-7",
    8: "row-col-8",
    9: "row-col-9",
    10: "row-col-10",
    11: "row-col-11",
    12: "row-col-12",
  }[size]);

export default function Tile({ children, xSize, ySize, title, header }: Props) {
  const rowSpan = ySize && mapYsizeToGridRowClass(ySize);
  const colSpan = xSize && mapXsizeToGridColClass(xSize);
  return (
    <div
      className={`flex flex-col gap-4 bg-primary-main shadow-xl rounded-2xl p-8 ${rowSpan} ${colSpan}`}
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
