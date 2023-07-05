import { Container } from "@mui/material";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

//lazy page loading
const Home = lazy(() => import("./pages/Home"));
const CreateTask = lazy(() => import("./pages/CreateTask"));
const EditTask = lazy(() => import("./pages/EditTask"));

function App() {
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
