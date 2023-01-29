import { Tile } from "src/components";

export default function CurrentTimerTile() {
  return (
    <Tile title="Automatic entry" header={"11:00:00"}>
      <div className="flex justify-between items-center">
        <input type="text" />
        <button className="bg-secondary-main hover:bg-secondary-alt p-3 w-24 rounded-xl text-md font-bold shadow-xl text-secondary-text">
          Clock in
        </button>
      </div>
    </Tile>
  );
}
