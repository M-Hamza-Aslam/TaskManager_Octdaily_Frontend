import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function useLoader() {
  const [loader, setLoader] = React.useState(false);
  const handleLoader = (value) => {
    setLoader(value);
  };

  return {
    LoadingComponent: (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    ),
    loader,
    handleLoader,
  };
}
export default useLoader;
