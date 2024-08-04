import { useMemo, useState } from "react";

interface Column {
    header: string;
    accessor: (item: any) => React.ReactNode;
    sortable?: boolean; // Make column sortable
}

interface TableProps {
    columns: Column[];
    data: any[];
    noDataMessage?: string;
    showIndex?: boolean;
}

const Table = ({
    columns,
    data,
    noDataMessage = "No data available",
    showIndex = false,
}: TableProps) => {
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "asc" | "desc";
    } | null>(null);

    // Sort data based on the current sortConfig
    const sortedData = useMemo(() => {
        if (!sortConfig) return data;

        const { key, direction } = sortConfig;
        return [...data].sort((a, b) => {
            const column = columns.find((col) => col.header === key);
            if (!column) return 0; // If column is not found, don't sort

            const valueA = column.accessor(a);
            const valueB = column.accessor(b);

            // Assuming the values are strings, adjust if needed
            if (typeof valueA === "string" && typeof valueB === "string") {
                if (valueA < valueB) return direction === "asc" ? -1 : 1;
                if (valueA > valueB) return direction === "asc" ? 1 : -1;
                return 0;
            }
            // Add more type handling logic if needed
            return 0;
        });
    }, [data, sortConfig, columns]);

    // Handle column header click
    const handleSort = (header: string) => {
        setSortConfig((prevConfig) => {
            if (prevConfig && prevConfig.key === header) {
                return {
                    key: header,
                    direction: prevConfig.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key: header, direction: "asc" };
        });
    };

    return (
        <div className="bg-white overflow-auto shadow-md rounded-lg w-full max-h-96">
            <table className="min-w-full divide-y divide-gray-400">
                <thead className="bg-gray-50/90 sticky top-0 glass">
                    <tr>
                        {showIndex && (
                            <th
                                className="px-6 py-3 text-left text-xs 
                                font-medium text-gray-500 uppercase tracking-wider">
                                #
                            </th>
                        )}
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                onClick={() =>
                                    col.sortable && handleSort(col.header)
                                }
                                className={`text-left text-xs px-6 py-3 
                                    font-medium text-gray-500 
                                    uppercase tracking-wider ${
                                        col.sortable ? "cursor-pointer" : ""
                                    }`}>
                                {col.header}
                                {col.sortable && (
                                    <span className="ml-2">
                                        {
                                            sortConfig &&
                                            sortConfig.key === col.header
                                                ? sortConfig.direction === "asc"
                                                    ? "↑" // or use an icon here
                                                    : "↓" // or use an icon here
                                                : "↕" // Default sort icon, you might want to adjust this
                                        }
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.length > 0 ? (
                        sortedData.map((item, index) => (
                            <tr key={index}>
                                {showIndex && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                )}
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-44">
                                        {col.accessor(item)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (showIndex ? 1 : 0)}
                                className="px-6 py-4 text-center text-sm text-gray-500">
                                {noDataMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
