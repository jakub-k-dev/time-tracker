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
        <tbody>
          {tableValues.map((col) => (
            <tr key={`row-${col[0]}`}>
              {col.map((cell, i) => (
                <td className="p-1" key={`row-${col[0]}-col-${i}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Tile>
  );
}
