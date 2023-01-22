import express from "express";
import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  unFollowUser,
  updateUser,
} from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();


//route
router.get('/', getAllUsers)
router.get("/:id", getUser);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id/follow", authMiddleware, followUser);
router.put("/:id/unfollow", authMiddleware, unFollowUser);

export default router;
