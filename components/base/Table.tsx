import React from "react";

const Table = <T,>({ data, columns, RowComponent }: TableProps<T>) => {
  return (
    <div className="overflow-auto scrollbar-thin">
      <table className="md:w-full w-[700px] px-3 border-collapse table-fixed md:overflow-autotext-[15px]">
        <thead className="bg-black/10 !w-full text-left text-black/95 whitespace-nowrap">
          <tr className="*:py-3 *:mb-2 *:font-semibold sm:*:py-2">
            {columns.map((column, index) => (
              <th
                key={index}
                className={` ${
                  index === 0
                    ? "rounded-s-[8px]"
                    : index === columns.length - 1
                    ? "rounded-e-[8px] text-center"
                    : ""
                } pl-4`}
              >
                {column}
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
