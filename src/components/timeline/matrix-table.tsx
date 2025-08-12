import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { totalBuffMap, totalBuffMapKeys } from "@/constants/constants";

interface MatrixTableProps {
  data: number[][];
}

export function MatrixTable({ data }: MatrixTableProps) {
  const rowHeaders = totalBuffMap.map((_, index) => index + 1);
  const columnHeaders = totalBuffMapKeys;

  // Default styling function based on value ranges
  const defaultGetCellStyle = (value: number) => {
    if (value > 0.8) return "bg-green-100 text-green-800";
    if (value > 0.6) return "bg-green-50 text-green-700";
    if (value > 0.4) return "bg-yellow-50 text-yellow-700";
    if (value > 0.2) return "bg-orange-50 text-orange-700";
    if (value > 0) return "bg-red-50 text-red-700";
    return "bg-gray-50 text-gray-500";
  };

  const cellStyleFn = defaultGetCellStyle;

  return (
    <div className="max-w-194 text-xs overflow-x-auto border rounded-sm">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th className="w-8 border border-gray-300 bg-gray-100 py-1 px-2.5 font-semibold text-gray-700">
              <Clock className="w-3 h-3" />
            </th>
            {columnHeaders.map((header, index) => (
              <th
                key={index}
                className="w-10 border border-gray-300 bg-gray-100 py-1 font-semibold text-gray-700 text-center overflow-hidden"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th className="border border-gray-300 bg-gray-50 py-1 px-2 font-semibold text-gray-700 text-right">
                {rowHeaders[rowIndex]}
              </th>
              {row.map((value, colIndex) => (
                <td
                  key={colIndex}
                  className={cn(
                    "border border-gray-300 py-1 text-center transition-colors",
                    cellStyleFn(value)
                  )}
                >
                  {typeof value === "number" ? value.toFixed(2) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
