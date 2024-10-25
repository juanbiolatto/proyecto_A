import { Router } from "express";
import { registerUser, getUsers, getUserById, deleteUser, updateUser} from "../controllers/controllers-auth";

const router = Router();

router.post("/register", registerUser );

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

export default router;