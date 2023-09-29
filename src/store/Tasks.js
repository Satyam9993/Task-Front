import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
};

export const usertaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setAddNewTask: (state, action) => {
      state.tasks = [action.payload.task, ...state.tasks];
    },
    setRemovetask: (state, action) => {
      const id = action.payload.taskId;
      // updation left
    //   state.tasks = state.tasks.filter(c => c !== id);
    }
  },
});

export const { setTasks, setAddNewTask, setRemovetask } = usertaskSlice.actions;
export default usertaskSlice.reducer;