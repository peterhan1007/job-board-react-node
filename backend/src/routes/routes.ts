import { Router } from "express";
import applicationController from "../controllers/application.controller";
import authController from "../controllers/auth.controller";
import clientController from "../controllers/client.controller";
import userController from "../controllers/user.controller";

const api = Router()
  .use(clientController)
  .use(authController)
  .use(applicationController)
  .use(userController);

export default Router().use("/api", api);
