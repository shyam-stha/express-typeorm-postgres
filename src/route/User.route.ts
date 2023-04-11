import { Router } from "express";
import { createUser, getUsers, getUsersById, removeUser, updateUser } from "../controller/User.controller";

const router = Router();

router.get("/", getUsers)
router.get("/:id", getUsersById)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", removeUser)

export default router;