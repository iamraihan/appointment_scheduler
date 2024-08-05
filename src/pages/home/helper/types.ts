export interface ITableData {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface Column<T> {
  header: string;
  key: keyof T;
  isShow: boolean;
  render: (row: T) => React.ReactNode;
}
