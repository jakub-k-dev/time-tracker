import { Tile, TimeTableEntryForm } from "src/components";

export default function NewEntryTile() {
  return (
    <div className="row-span-2">
      <Tile title="Manual entry">
        <TimeTableEntryForm mode="creating" />
      </Tile>
    </div>
  );
}
