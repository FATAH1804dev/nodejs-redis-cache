import controllerCategories from "../controller/controller-categories.js";
import controllerUser from "../controller/controller-user.js";
import express from "express";

const publicRouter = new express.Router();
publicRouter.get("/api/categories", controllerCategories.getAll);
publicRouter.post("/api/users", controllerUser.register);
publicRouter.post("/api/users/login", controllerUser.login);

export { publicRouter };
