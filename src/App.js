import { Container } from "@mui/material";
import "./App.css";
import TaskTable from "./components/TaskTable/TaskTable";

function App() {
  return (
    <div className="App">
      <Container maxWidth="md">
        <h1>Task Manager</h1>
        <TaskTable />
      </Container>
    </div>
  );
}

export default App;
