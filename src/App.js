import { Container } from "@mui/material";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "./store/taskSlice";
import { BACKEND_DOMAIN } from "./config";

//lazy page loading
const Home = lazy(() => import("./pages/Home"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const EditTask = lazy(() => import("./pages/EditTask"));

function App() {
  const dispatch = useDispatch();

  // fetching task list from backend
  useEffect(() => {
    const fetchTaskList = async () => {
      const response = await fetch(`${BACKEND_DOMAIN}/task/list`);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching task list");
      }
      const data = await response.json();

      // dispatching action to update task list in redux store
      dispatch(taskActions.setTasks(data.tasks));
    };
    fetchTaskList();
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer />
      <Container className="mainAppContainer" maxWidth="md">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/create-task"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <CreateTask />
              </Suspense>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditTask />
              </Suspense>
            }
          />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
