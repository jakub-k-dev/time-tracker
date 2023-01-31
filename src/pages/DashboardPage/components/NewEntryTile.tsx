import { Tile } from "src/components";
import TimeTableEntryForm from "src/components/TimeTableEntryForm/TimeTableEntryForm";

export default function NewEntryTile() {
  return (
    <Tile ySize={2} title="Manual entry">
      <TimeTableEntryForm mode="creating" />
    </Tile>
  );
}
