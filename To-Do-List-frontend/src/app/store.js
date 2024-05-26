//curly brackets=same name importing
//without curly brackets=globly importing
import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from '../features/user/userSlice';
import  taskReducer from "../features/task/taskSlice";
export const store = configureStore({
  reducer: {
    auth:authReducer,
    tasks:taskReducer,
  },
});
