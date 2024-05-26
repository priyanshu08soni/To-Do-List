const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModels");

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const Task = require("../models/TaskModel");

const createUser = asyncHandler(async (req, res) => {
  //asigning the email that is filled in form to email variable.
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    //user is already exist
    throw new Error("User Already Exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        new: true,
      }
    );
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});


//Update a user
const updatedUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

const addTask = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, status, duedate }=req.body;
  validateMongoDbId(_id);
  try {
    let newTask= await new Task(
      {
        userId:_id,
        title:title,
        description:description,
        status:status,
        duedate:duedate
      }
    ).save();
    res.json(newTask);
  } catch (error) {
    throw new Error(error);
  }
});
const updateTask = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {id} =req.params;
  const { title, description, status, duedate }=req.body;
  validateMongoDbId(_id);
  try {
    let newTask=await Task.findByIdAndUpdate(
      id,
      {
        title:title,
        description:description,
        status:status,
        duedate:duedate,
      },
      {
        new:true,
      }
    );
    res.json(newTask);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    res.json(deletedTask);
  } catch (error) {
    throw new Error(error);
  }
});
const getUserTasks = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongoDbId(id);
  try {
    const tasks = await Task.find({
      userId:id
    });
    res.json(tasks);
  } catch (error) {
    throw new Error(error);
  }
});
const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const task = await Task.findOne({
      _id:id
    });
    res.json(task);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  updatedUser,
  addTask,
  deleteTask,
  updateTask,
  getTask,
  getUserTasks
};
