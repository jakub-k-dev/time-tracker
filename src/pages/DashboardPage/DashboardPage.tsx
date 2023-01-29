import { Tile } from "src/components";

import CurrentTimerTile from "./components/CurrentTimerTile";
import StatisticsTile from "./components/StatisticsTile";

export default function DashboardPage() {
  return (
    <h1>
      <div className="grid grid-cols-2 gap-8">
        <Tile ySize={2} title="Manual entry">
          <div></div>
        </Tile>
        <CurrentTimerTile />
        <StatisticsTile />
      </div>
    </h1>
  );
}
