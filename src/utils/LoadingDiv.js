import classes from "./LoadingDiv.module.css";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingDiv = () => {
  return (
    <div className={classes.loading}>
      <CircularProgress />
      <h5>Please Wait...</h5>
    </div>
  );
};
export default LoadingDiv;
