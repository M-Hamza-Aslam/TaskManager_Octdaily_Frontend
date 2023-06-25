import { createSlice } from "@reduxjs/toolkit";

const taskInitialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "taskState",
  initialState: taskInitialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      state.tasks[taskIndex] = action.payload;
    },
    deleteTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task._id === action.payload
      );
      state.tasks.splice(taskIndex, 1);
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice.reducer;
