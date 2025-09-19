import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
};

export default meta;
type Story = StoryObj<typeof DataTable<User>>;

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: "name", title: "Name", dataIndex: "name", sortable: true },
      { key: "email", title: "Email", dataIndex: "email" },
    ],
    selectable: true,
  },
};
