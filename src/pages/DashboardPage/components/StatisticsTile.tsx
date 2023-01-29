import { Tile } from "src/components";

const tableValues = [
  ["Today", "12h"],
  ["Past week:", "16h"],
  ["Past month:", "60h"],
  ["Past year:", "430h"],
  ["Total:", "2000h"],
];

export default function StatisticsTile() {
  return (
    <Tile title="Statistics">
      <table>
        {tableValues.map((col) => (
          <tr>
            {col.map((cell) => (
              <td className="p-1">{cell}</td>
            ))}
          </tr>
        ))}
      </table>
    </Tile>
  );
}
