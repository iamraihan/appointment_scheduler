import { ITableData } from "@/pages/home/helper/types";

export const data: ITableData[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Complete the project documentation",
    date: "Project doc",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Review the code for module 3",
    date: "Code review",
    time: "2:00 PM",
  },
];

export const actions = [
  {
    id: 1,
    label: "Upcoming Appointments",
    type: "upcoming_appointments",
    show: true,
  },
  { id: 2, label: "Cancel", type: "cancel", show: true },
];
