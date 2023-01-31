import { Tile, TimeTableEntryForm } from "src/components";

export default function NewEntryTile() {
  return (
    <Tile ySize={2} title="Manual entry">
      <TimeTableEntryForm mode="creating" />
    </Tile>
  );
}
