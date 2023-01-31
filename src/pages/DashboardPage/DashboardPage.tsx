import CurrentTimerTile from "./components/CurrentTimerTile";
import NewEntryTile from "./components/NewEntryTile";
import StatisticsTile from "./components/StatisticsTile";

export default function DashboardPage() {
  return (
    <h1>
      <div className="grid grid-cols-2 gap-8">
        <NewEntryTile />
        <CurrentTimerTile />
        <StatisticsTile />
      </div>
    </h1>
  );
}
