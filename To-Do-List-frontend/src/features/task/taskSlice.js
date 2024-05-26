import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";
import { toast } from "react-toastify";

export const getAllTasks = createAsyncThunk("get/tasks",async(data,thunkAPI)=>{
    try {
        return await taskService.getAllTasks(data); 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const addTask = createAsyncThunk("add/task",async(data,thunkAPI)=>{
    try {
        return await taskService.addTask(data); 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const updateTask = createAsyncThunk("update/task",async(data,thunkAPI)=>{
    try {
        return await taskService.updateTask(data); 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const getTask = createAsyncThunk("get/task",async(data,thunkAPI)=>{
    try {
        return await taskService.getTask(data); 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
export const deleteTask = createAsyncThunk("delete/task",async(data,thunkAPI)=>{
    try {
        return await taskService.deleteTask(data); 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState=createAction("Reset_all");

const initialState={
    task:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const taskSlice=createSlice({
    name:"task",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllTasks.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllTasks.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.task=action.payload;
        })
        .addCase(getAllTasks.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Somthing Went Wrong");
            }
        })
        .addCase(addTask.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.newTask=action.payload;
            if(state.isSuccess===true){
                toast.success("Task Added Successfully!");
            }
        })
        .addCase(addTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Somthing Went Wrong");
            }
        })
        .addCase(updateTask.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.updatedTask=action.payload;
            if(state.isSuccess===true){
                toast.success("Task Updated Successfully!");
            }
        })
        .addCase(updateTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Somthing Went Wrong");
            }
        })
        .addCase(getTask.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.taskTitle=action.payload.title;
            state.taskDescription=action.payload.description;
            state.taskStatus=action.payload.status;
            state.taskDuedate=action.payload.duedate;
        })
        .addCase(getTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Somthing Went Wrong");
            }
        })
        .addCase(deleteTask.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteTask.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.isError=false;
            state.deletedTask=action.payload;
            if(state.isSuccess===true){
                toast.success("Task Deleted Successfully.")
            }
        })
        .addCase(deleteTask.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true){
                toast.error("Somthing Went Wrong");
            }
        })
        .addCase(resetState,()=>initialState);
    }
})

export default taskSlice.reducer;