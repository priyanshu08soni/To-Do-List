import React, { useEffect } from "react";
import Meta from "../components/Meta";
import image from "../assets/sign.png";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getAllTasks } from "../features/task/taskSlice";
const Home = () => {
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const taskState = useSelector((state) => state?.tasks?.task);
  useEffect(() => {
    if (userState === null) {
      navigate("/login");
    }
  }, [userState]);
  useEffect(() => {
    dispatch(getAllTasks(config2));
  }, [userState]);
  
  const deleteATask=(taskId)=>{
    dispatch(deleteTask({id:taskId,config2:config2}));
    setTimeout(() => {
      dispatch(getAllTasks(config2));
    }, 100);
  }
  return (
    <>
      <Meta title="To-Do-List App" />
      <div className="content">
        <h1 className="home-heading">To-Do-List (CRUD)</h1>
        <div className="hd">
          <div className="horizontal-divider"></div>
        </div>
        <div className="add-container">
          <button className="add-button" onClick={()=>navigate("/task")}>
            <img src={image} alt="" />
          </button>
        </div>
        <div className="hd">
          <div className="horizontal-divider"></div>
        </div>
        <div className="task-list">
          <div className="list-container">
            <div className="d-flex bg-white align-items-center task-list-item">
              <div className="w-25">
                <div className="title">Title</div>
              </div>
              <div className="divider"></div>
              <div className="w-25">
                <div className="title">Description</div>
              </div>
              <div className="divider"></div>
              <div className="w-25">
                <div className="title">Status</div>
              </div>
              <div className="divider"></div>
              <div className="w-25">
                <div className="title">Due</div>
              </div>
              <div className="divider"></div>
              <div>
                <div className="title update">Update</div>
              </div>
              <div>
                <div className="title update">Delete</div>
              </div>
            </div>
          </div>
          {taskState &&
            taskState?.map((item, index) => {
              return (
                <div className="list-container" key={index}>
                  <div className="d-flex bg-white align-items-center task-list-item">
                    <div className="w-25">
                      <div className="title-content">
                        {item?.title}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="w-25">
                      <div className="title-content">
                        {item?.description}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="w-25">
                      <div className="title-content">
                        {item?.status}
                      </div>
                    </div>
                    <div className="divider"></div>
                    <div className="w-25">
                      <div className="title-content">
                        {
                          moment(item?.duedate).format(
                          "MMMM Do"
                          )
                        }
                      </div>
                    </div>
                    <div className="divider"></div>
                    <Link className="update-button" to={`/task/${item?._id}`} >
                      Update
                    </Link>
                    <button className="update-button" onClick={()=>{deleteATask(item?._id)}} >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
