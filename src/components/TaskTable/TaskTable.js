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
  Button,
  MenuItem,
} from "@mui/material";
import TaskRow from "./TaskRow";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { BACKEND_DOMAIN } from "../../config";
import { taskActions } from "../../store/taskSlice";
import LoadingDiv from "../../utils/LoadingDiv";

const newTaskObj = {
  _id: "0",
  title: "",
  asignee: "",
  status: "",
  description: "",
};

const TaskTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.task.tasks);

  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAttribute, setSortAttribute] = useState("title");
  const [sortBy, setSortBy] = useState("asc");
  const [taskStatusFilter, setTaskStatusFilter] = useState("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(null);

  // Filtering and Sorting functions
  const filteredData = tasks.filter((entry) => {
    const matchesSearchQuery =
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.asignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  // fetching task list from backend
  useEffect(() => {
    const fetchTaskList = async () => {
      setLoading(true);
      const response = await fetch(`${BACKEND_DOMAIN}/task/list`);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching task list");
      }
      const data = await response.json();

      // dispatching action to update task list in redux store
      dispatch(taskActions.setTasks(data.tasks));
      setLoading(false);
    };
    fetchTaskList();
  }, [dispatch]);

  // JSX rendering
  return (
    <>
      <div className={classes.taskHeader}>
        <Button
          variant="contained"
          onClick={() => navigate("/create-task", { state: newTaskObj })}
        >
          Add Task
        </Button>
        <TextField
          label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
        />
        <TextField
          select
          label="Sort By"
          value={sortAttribute}
          onChange={(e) => setSortAttribute(e.target.value)}
          className={classes.sortBy}
          size="small"
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="asignee">Asignee</MenuItem>
        </TextField>
        <TextField
          select
          label="Task Status"
          value={taskStatusFilter}
          onChange={(e) => setTaskStatusFilter(e.target.value)}
          className={classes.taskStatusFilter}
          size="small"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
          <MenuItem value="In progress">In Progress</MenuItem>
        </TextField>
      </div>

      <TableContainer>
        {loading ? (
          <LoadingDiv />
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={classes.colHeading} align="left">
                  Title
                </TableCell>
                <TableCell className={classes.colHeading} align="left">
                  Asignee
                </TableCell>
                <TableCell className={classes.colHeading} align="left">
                  Status
                </TableCell>
                <TableCell className={classes.colHeading} align="left">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry) => (
                  <TaskRow key={entry._id} row={entry} />
                ))}
            </TableBody>
          </Table>
        )}
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

export default TaskTable;
