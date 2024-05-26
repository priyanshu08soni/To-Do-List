import React, { useEffect } from "react";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addTask, getTask, resetState, updateTask } from "../features/task/taskSlice";
let taskSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is Required"),
  duedate: yup.date().required("Due is required"),
});

const TaskForm = () => {
  const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    },
    Accept: "application/json",
  };
  const location=useLocation();
  const taskId=location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState=useSelector(state=>state?.auth?.user);
  const newTask=useSelector(state=>state.tasks);
  const {taskTitle,taskDescription,taskStatus,taskDuedate}=newTask;
  useEffect(()=>{
    if(taskId!==undefined){
      dispatch(getTask({id:taskId,config2:config2}));
    }else{
      dispatch(resetState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[taskId]);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title: taskTitle || "",
      description: taskDescription || "",
      status: taskStatus || "",
      duedate: moment(taskDuedate).format("YYYY-MM-DD") || "",
    },
    validationSchema: taskSchema,
    onSubmit: (values) => {
      if(taskId===undefined){
        let data={data:values,config2:config2};
        dispatch(addTask(data));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 100);
      }
      if(taskId!==undefined){
        let data1={id:taskId,data:values,config2:config2};
        dispatch(updateTask(data1));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          navigate("/");
        }, 100);      }
    }
  });
  useEffect(()=>{
    if(userState===null){
      navigate("/login");
    }
  },[userState])
  return (
    <Container class1="login-wrapper home-wrapper-2">
      <div className="row">
        <div className="col-12">
          <div className="auth-card">
            <h3 className="text-center mb-3">Task</h3>
            <form
              action=""
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column gap-15"
            >
              <CustomInput
                type="text"
                placeholder="Title"
                name="title"
                className="form-control"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                OnBlur={formik.handleBlur("title")}
              />
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
              <CustomInput
                type="text"
                placeholder="Description"
                name="description"
                className="form-control"
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                OnBlur={formik.handleBlur("description")}
              />
              <div className="error">
                {formik.touched.description && formik.errors.description}
              </div>
              <CustomInput
                name="duedate"
                type="date"
                placeholder="Due"
                className="form-control"
                value={moment(formik.values.duedate).format("YYYY-MM-DD")}
                onChange={formik.handleChange("duedate")}
                OnBlur={formik.handleBlur("duedate")}
              />
              <div className="error">
                {formik.touched.duedate && formik.errors.duedate}
              </div>
              <div className="title" >Status</div>
              <select
                name="status"
                type="text"
                className="form-control form-select"
                value={formik.values.status}
                onChange={formik.handleChange("status")}
                onBlur={formik.handleBlur("status")}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div>
                <div className="mt-1 d-flex justify-content-center align-items-center gap-15">
                  {
                    !taskId && <button type="submit" className="button border-0">
                      Add Task
                    </button>
                  }
                  {
                    taskId && 
                  <button type="submit" className="button border-0">
                    Update Task
                  </button>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TaskForm;
