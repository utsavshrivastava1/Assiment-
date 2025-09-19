import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" }>();

  const handleSelectRow = (row: T) => {
    let updated: T[] = [];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  if (loading)
    return (
      <div className="p-4 text-center text-gray-500 animate-pulse">
        Loading...
      </div>
    );
  if (data.length === 0)
    return <div className="p-4 text-center text-gray-500">No data available</div>;

  return (
    <table className="min-w-full border-collapse border border-gray-300 shadow-sm rounded-xl overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {selectable && <th className="border p-2"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              className="border p-3 text-left text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => col.sortable && handleSort(col.dataIndex)}
            >
              <div className="flex items-center space-x-1">
                <span>{col.title}</span>
                {sortConfig?.key === col.dataIndex && (
                  <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-50 transition-colors"
          >
            {selectable && (
              <td className="border p-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => handleSelectRow(row)}
                  className="cursor-pointer accent-indigo-600"
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={col.key} className="border p-3 text-gray-700">
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

