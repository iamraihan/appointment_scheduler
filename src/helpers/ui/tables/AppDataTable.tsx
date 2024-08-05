/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, FC } from "react";
import { size } from "lodash";
import { AppNothingToShow } from "@/helpers/ui";

interface Column<T> {
  key: keyof T;
  header?: string;
  isShow?: boolean;
  render?: (rowData: T) => ReactNode;
}

interface AppDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  showHeaderTop?: boolean;
  showHeader?: boolean;
  height?: string;
  customSize?: string;
  options?: {
    isInitialLoading?: boolean;
  };
  CustomHeader?: FC;
}

const AppDataTable = <T,>({
  columns,
  data,
  showHeaderTop = false,
  showHeader = true,
  height = "h-[47rem]",
  customSize = "font-normal text-14 text-border",
  options: { isInitialLoading = false } = {},
  CustomHeader = () => null,
}: AppDataTableProps<T>) => (
  <div
    className={`flex flex-col overflow-hidden justify-center bg-white ${
      !showHeader ? "" : "rounded-xl "
    }`}
  >
    <div
      className={`bg-white ${
        showHeader && "rounded-2xl"
      } shadow-lg overflow-x-auto no-scrollbar w-full px-1 ${height}`}
    >
      <table className="w-full text-left ">
        {showHeader && (
          <thead className="sticky top-0 z-10 rounded-t-2xl bg-gray-100 ">
            {showHeaderTop && (
              <tr>
                <th scope="col" colSpan={7} className="w-full">
                  <CustomHeader />
                </th>
              </tr>
            )}
            <tr>
              {columns?.map((column) => {
                const { key, header } = column;
                const isActionColumn = ["action", "actions"].includes(
                  String(key)
                );

                if (
                  column.isShow !== false &&
                  !(isActionColumn && isInitialLoading)
                ) {
                  return (
                    <th
                      scope="col"
                      className={`px-6 whitespace-nowrap ${customSize} py-6 ${
                        isActionColumn && "text-end"
                      }`}
                      key={String(key)}
                    >
                      {header || ""}
                    </th>
                  );
                }
                return null;
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {(() => {
            if (!isInitialLoading && size(data)) {
              return data?.map((rowData, rowIndex) => (
                <tr
                  className={`${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-white-light"
                  }`}
                  key={String((rowData as any).id)}
                >
                  {columns?.map(
                    (column) =>
                      column.isShow !== false && (
                        <td
                          className={`px-6 md:pr-0 py-4 font-medium text-gray-900 ${
                            (column.key === "action" ||
                              column.key === "actions") &&
                            "text-end"
                          }`}
                          key={String(column.key)}
                        >
                          {column.render
                            ? column.render(rowData)
                            : (rowData as any)[column.key]}
                        </td>
                      )
                  )}
                </tr>
              ));
            }
            return (
              <tr className="bg-white">
                <td colSpan={columns.length} className="text-center">
                  <AppNothingToShow
                    loading={isInitialLoading}
                    spinnerClass="p-40"
                  />
                </td>
              </tr>
            );
          })()}
        </tbody>
      </table>
    </div>
  </div>
);

export default AppDataTable;
