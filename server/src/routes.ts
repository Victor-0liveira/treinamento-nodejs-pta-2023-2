import express from "express";
import userController from "./controllers/UserController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.get("/users/by-initial/:letter", userController.getUsersByInitial);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

export default routes;
