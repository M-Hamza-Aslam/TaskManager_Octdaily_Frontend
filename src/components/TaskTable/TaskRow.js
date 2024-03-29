import classes from "./TaskRow.module.css";
import { Fragment, useState } from "react";
import {
  IconButton,
  Collapse,
  TableCell,
  TableRow,
  Typography,
  Box,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/taskSlice";
import { toast } from "react-toastify";
import { BACKEND_DOMAIN } from "../../config";
import useLoader from "../../utils/Hooks/useLoader";

export default function TaskRow(props) {
  const { row } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, handleLoader, LoadingComponent } = useLoader();

  //state variables
  const [open, setOpen] = useState(false);

  //Hnadlers
  const editTaskHandler = () => {
    navigate(`/edit-task/${row._id}`, { state: row });
  };
  const deleteTaskHandler = async () => {
    try {
      handleLoader(true);
      const fetchResult = await fetch(
        `${BACKEND_DOMAIN}/task/delete?id=${row._id}`,
        {
          method: "DELETE",
        }
      );
      if (!fetchResult.ok) {
        handleLoader(false);
        toast.error("Something went wrong while deleting task");
        return;
      }
      const result = await fetchResult.json();
      console.log(result);
      // update the context API
      dispatch(taskActions.deleteTask(row._id));
      toast.success("Task deleted successfully");
      handleLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {loader && LoadingComponent}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {row.title}
        </TableCell>
        <TableCell align="left">{row.asignee}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          <Button onClick={editTaskHandler}>
            <EditIcon className={classes.actionIcon} />
          </Button>
          <Button onClick={deleteTaskHandler}>
            <DeleteIcon className={classes.actionIcon} />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <p>{row.description}</p>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
