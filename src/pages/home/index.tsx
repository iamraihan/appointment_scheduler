import React from "react";
import { AppButton, AppDataTable } from "@/helpers/ui";
import { MoreHorizontal, Trash2 } from "react-feather";
import { Column, ITableData } from "@/pages/home/helper/types";
import { data } from "./helper/uiData";

// Define the Column type

const Home: React.FC = () => {
  // const [loading, setLoading] = useState<boolean>(false);

  const deleteHandler = () => {
    console.log("Run delete handler...");
  };

  const actionsHandler = (row: ITableData) => {
    console.log("row: ", row);
  };

  const columns: Column<ITableData>[] = [
    {
      header: "Title",
      key: "title",
      isShow: true,
      render: (row: ITableData) => <div>{row.title}</div>,
    },
    {
      header: "Description",
      key: "description",
      isShow: true,
      render: (row: ITableData) => <div>{row.description}</div>,
    },
    {
      header: "Data",
      key: "date",
      isShow: true,
      render: (row: ITableData) => <div>{row.date}</div>,
    },
    {
      header: "Time",
      key: "time",
      isShow: true,
      render: (row: ITableData) => <div>{row.time}</div>,
    },
    {
      header: "Actions",
      key: "id",
      isShow: true,
      render: (row: ITableData) => (
        <div className="relative inline-block text-left">
          <div
            className="font-bold ps-4 hover:underline cursor-pointer"
            onClick={() => actionsHandler(row)}
          >
            <MoreHorizontal />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h2>Hello Home</h2>
      <div className="flex gap-5 items-center">
        <AppButton title="Default Button" />
        <AppButton
          btnType="btn_danger"
          title="Delete"
          Icon={Trash2}
          callBack={deleteHandler}
        />
      </div>
      <AppDataTable<ITableData>
        columns={columns}
        data={data}
        height="min-h-[20rem] md:h-[50rem]"
        customSize="font-medium text-18 text-dark"
        // options={{ isInitialLoading: loading }} // Uncomment when implementing API loading
      />
    </div>
  );
};

export default Home;
