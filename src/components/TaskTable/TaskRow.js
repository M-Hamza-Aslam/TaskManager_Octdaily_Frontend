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

export default function TaskRow(props) {
  const { row, handleDelete } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
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
        <TableCell component="th" scope="row" align="center">
          {row.title}
        </TableCell>
        <TableCell align="center">{row.dueDate}</TableCell>
        <TableCell align="center">{row.asignee}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <Button>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
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
