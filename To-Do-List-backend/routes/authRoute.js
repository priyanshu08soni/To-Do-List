const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddlewares");
const {
  createUser,
  loginUserCtrl,
  updatedUser,
  addTask,
  deleteTask,
  updateTask,
  getTask,
  getUserTasks,
} = require("../controller/userCtrl");
const router = express.Router();
//authroute->userctrl->usermodel tocheck user
router.post("/login", loginUserCtrl);
router.post("/register", createUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.post("/task", authMiddleware, addTask);
router.delete("/task/:id", authMiddleware, deleteTask);
router.put("/task/:id", authMiddleware, updateTask);
router.get("/task/:id", authMiddleware, getTask);
router.get("/task", authMiddleware, getUserTasks);

module.exports = router;
