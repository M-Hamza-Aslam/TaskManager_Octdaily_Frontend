import classes from "./NewTask.module.css";
import { TextField, MenuItem, Button } from "@mui/material";
import useInput from "../../utils/Hooks/useInput";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BACKEND_DOMAIN } from "../../config";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/taskSlice";
import useLoader from "../../utils/Hooks/useLoader";

const NewTask = (props) => {
  const { isEdit } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locatiion = useLocation();
  const { loader, handleLoader, LoadingComponent } = useLoader();
  const { state } = locatiion;

  //inputs
  const {
    value: titleValue,
    isValid: titleIsValid,
    isError: titleIsError,
    inputKeyStrockHandler: titleInputKeyStrockHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: titleReset,
  } = useInput(state.title, (value) => {
    const regix = /^.{5,}$/;
    return regix.test(value);
  });

  const {
    value: asigneeValue,
    isValid: asigneeIsValid,
    isError: asigneeIsError,
    inputKeyStrockHandler: asigneeInputKeyStrockHandler,
    inputBlurHandler: asigneeInputBlurHandler,
    reset: asigneeReset,
  } = useInput(state.asignee, (value) => {
    const regix = /^.{5,}$/;
    return regix.test(value);
  });
  const {
    value: statusValue,
    isValid: statusIsValid,
    isError: statusIsError,
    inputKeyStrockHandler: statusInputKeyStrockHandler,
    inputBlurHandler: statusInputBlurHandler,
    reset: statusReset,
  } = useInput(state.status, (value) => value.trim() !== "");
  const {
    value: descriptionValue,
    isValid: descriptionIsValid,
    isError: descriptionIsError,
    inputKeyStrockHandler: descriptionInputKeyStrockHandler,
    inputBlurHandler: descriptionInputBlurHandler,
    reset: descriptionReset,
  } = useInput(state.description, (value) => {
    const regix = /^.{20,}$/;
    return regix.test(value);
  });

  //form validation
  const formIsValid =
    titleIsValid && statusIsValid && descriptionIsValid && asigneeIsValid;

  //handlers
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      toast.error("Please fill all the fields correctly!");
      return;
    }
    const newTask = {
      title: titleValue,
      status: statusValue,
      description: descriptionValue,
      asignee: asigneeValue,
    };
    try {
      //fetch call
      handleLoader(true);
      const URL = isEdit
        ? `${BACKEND_DOMAIN}/task/update?id=${state._id}`
        : `${BACKEND_DOMAIN}/task/add-new`;
      const fetchResponse = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!fetchResponse.ok) {
        handleLoader(false);
        throw new Error("Something went wrong!");
      }
      const responseData = await fetchResponse.json();
      console.log(responseData);
      //update the redux store
      if (isEdit) {
        dispatch(taskActions.updateTask(responseData.task));
      } else {
        dispatch(taskActions.addTask(responseData.task));
      }
      toast.success("Task created successfully!");
      titleReset();
      statusReset();
      descriptionReset();
      asigneeReset();
      handleLoader(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.newTask}>
      {loader && LoadingComponent}
      <h1> {isEdit ? "UPDATE TASK" : "ADD TASK"}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.formControl}>
          <TextField
            value={titleValue}
            onChange={titleInputKeyStrockHandler}
            onBlur={titleInputBlurHandler}
            error={titleIsError}
            id="standard-error-helper-text"
            label="Title"
            variant="outlined"
            size="small"
            pattern="[A-Za-z0-9]{5,20}"
            sx={{ "& .MuiInputBase-input": { backgroundColor: "white" } }}
            helperText={
              titleIsError ? "Incorrect title." : "atleast 5 characters"
            }
          />
          <TextField
            value={asigneeValue}
            onChange={asigneeInputKeyStrockHandler}
            onBlur={asigneeInputBlurHandler}
            error={asigneeIsError}
            id="standard-error-helper-text"
            label="Asignee"
            variant="outlined"
            size="small"
            pattern="[A-Za-z0-9]{5,20}"
            sx={{ "& .MuiInputBase-input": { backgroundColor: "white" } }}
            helperText={
              asigneeIsError ? "Incorrect Asignee." : "atleast 5 characters"
            }
          />
          <TextField
            value={statusValue}
            onChange={statusInputKeyStrockHandler}
            onBlur={statusInputBlurHandler}
            error={statusIsError}
            id="standard-error-helper-text"
            label="Status"
            variant="outlined"
            size="small"
            select
            defaultValue="complete"
            sx={{
              "& .MuiInputBase-input": {
                backgroundColor: "white",
                textAlign: "start",
              },
            }}
            helperText={statusIsError ? "Incorrect status." : "Select status"}
          >
            <MenuItem value="Complete">complete</MenuItem>
            <MenuItem value="In progress">In Progress</MenuItem>
          </TextField>
          <TextField
            value={descriptionValue}
            onChange={descriptionInputKeyStrockHandler}
            onBlur={descriptionInputBlurHandler}
            error={descriptionIsError}
            id="standard-error-helper-text"
            label="Description"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            sx={{
              "& .MuiInputBase-multiline": {
                backgroundColor: "white",
              },
            }}
            helperText={
              descriptionIsError
                ? "Incorrect description."
                : "atleast 20 characters"
            }
          />
        </div>
        <div className={classes.formBtn}>
          <Button
            type="submit"
            variant="contained"
            className={classes.primaryBtn}
          >
            {isEdit ? "Update Task" : "Add Task"}
          </Button>
          <Link to="/">
            <Button
              type="button"
              variant="contained"
              color="error"
              className={classes.secondaryBtn}
              onClick={() => navigate(-1, { replace: true })}
            >
              Back
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewTask;
