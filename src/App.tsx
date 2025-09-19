import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable/DataTable";
import "./App.css"; 
function App() {
  return (
    <div className="p-4 space-y-8">
      <InputField label="Username" placeholder="Enter name" clearable />

      <DataTable
        data={[
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
        ]}
        columns={[
          { key: "name", title: "Name", dataIndex: "name", sortable: true },
          { key: "email", title: "Email", dataIndex: "email" },
        ]}
        selectable
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
}

export default App;
