import React from "react";

interface Column {
  name: string;
  width?: string;
  align?: "left" | "center" | "right";
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  RowComponent: React.ComponentType<{ item: T }>;
}

const Table = <T,>({ data, columns, RowComponent }: TableProps<T>) => {
  return (
    <div className="overflow-auto custom-scrollbar">
      <table className="md:w-full w-[700px] px-3 border-collapse md:overflow-auto text-[15px]">
        <thead className="bg-black/10 !w-full text-left text-black/95 whitespace-nowrap">
          <tr className="*:py-3 *:mb-2 *:font-medium sm:*:py-2">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${
                  index === 0
                    ? "rounded-s-[8px]"
                    : index === columns.length - 1
                    ? "rounded-e-[8px]"
                    : ""
                } pl-4 ${
                  column.align === "center"
                    ? "text-center"
                    : column.align === "right"
                    ? "text-right"
                    : "text-left"
                }`}
                style={{
                  width: column.width || "auto",
                  minWidth: "80px",
                }}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="*:rounded-xl text-black/85">
          {data.map((item, index) => (
            <RowComponent key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
