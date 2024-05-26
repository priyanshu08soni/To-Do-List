import axios from "axios"
import { base_url } from "../../utils/base_url"

const getAllTasks = async(data)=>{
    const response=await axios.get(`${base_url}task`,data);
    return response?.data;
}
const addTask=async(data)=>{
    const response=await axios.post(`${base_url}task`,data.data,data.config2);
    return response?.data;
}
const updateTask=async(data)=>{
    const response=await axios.put(`${base_url}task/${data.id}`,data.data,data.config2);
    return response?.data;
}
const getTask=async(data)=>{
    const response=await axios.get(`${base_url}task/${data.id}`,data.config2);
    return response?.data;
}
const deleteTask=async(data)=>{
    const response=await axios.delete(`${base_url}task/${data.id}`,data.config2);
    return response?.data;
}

const taskService={
    getAllTasks,
    addTask,
    updateTask,
    getTask,
    deleteTask
}
export default taskService;