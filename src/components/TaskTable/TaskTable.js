import React, { useState } from "react";
import classes from "./TaskTable.module.css";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  IconButton,
  Button,
  MenuItem,
} from "@mui/material";
import TaskRow from "./TaskRow";

// Sample data
const initialData = [
  {
    id: 1,
    title: "Create ERD",
    dueDate: "2023-06-30",
    asignee: "Ahmed",
    status: "In progress",
    description: "create ERD for project Pluto",
  },
  {
    id: 2,
    title: "Design Flow diagram",
    dueDate: "2023-06-20",
    asignee: "Noman",
    status: "Complete",
    description: "design flow diagram as instructed for the king food app",
  },
  {
    id: 3,
    title: "Provide quotation on pizzaria",
    dueDate: "2023-06-25",
    asignee: "Usman",
    status: "In progress",
    description: "provide complete quotation on pizzaria project",
  },

  // Add more data entries as needed
];

const MyTable = () => {
  // State variables
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAttribute, setSortAttribute] = useState("title");
  const [sortBy, setSortBy] = useState("asc");
  const [taskStatusFilter, setTaskStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtering and Sorting functions
  const filteredData = data.filter((entry) => {
    const matchesSearchQuery =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.asignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.dueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTaskStatus =
      taskStatusFilter === "All" || entry.status === taskStatusFilter;

    return matchesSearchQuery && matchesTaskStatus;
  });

  const sortedData = filteredData.sort((a, b) => {
    const sortValueA = a[sortAttribute];
    const sortValueB = b[sortAttribute];

    if (sortValueA < sortValueB) {
      return sortBy === "asc" ? -1 : 1;
    }
    if (sortValueA > sortValueB) {
      return sortBy === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // CRUD operations
  const handleDelete = (id) => {
    const updatedData = data.filter((entry) => entry.id !== id);
    setData(updatedData);
  };

  // JSX rendering
  return (
    <>
      <div className={classes.taskHeader}>
        <Button variant="contained">Add Task</Button>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          select
          label="Sort By"
          value={sortAttribute}
          onChange={(e) => setSortAttribute(e.target.value)}
          className={classes.sortBy}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="dueDate">DueDate</MenuItem>
          <MenuItem value="asignee">Asignee</MenuItem>
        </TextField>
        <TextField
          select
          label="Task Status"
          value={taskStatusFilter}
          onChange={(e) => setTaskStatusFilter(e.target.value)}
          className={classes.taskStatusFilter}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
          <MenuItem value="In progress">In Progress</MenuItem>
        </TextField>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className={classes.colHeading} align="center">
                Title
              </TableCell>
              <TableCell className={classes.colHeading} align="center">
                Due Date
              </TableCell>
              <TableCell className={classes.colHeading} align="center">
                Asignee
              </TableCell>
              <TableCell className={classes.colHeading} align="center">
                Status
              </TableCell>
              <TableCell className={classes.colHeading} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry) => (
                <TaskRow
                  key={entry.id}
                  row={entry}
                  handleDelete={handleDelete}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default MyTable;
