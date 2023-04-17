import { Tile, TimeTableEntryForm } from "src/components";

export default function NewEntryTile() {
  return (
    <Tile title="Manual entry">
      <TimeTableEntryForm mode="creating" />
    </Tile>
  );
}
