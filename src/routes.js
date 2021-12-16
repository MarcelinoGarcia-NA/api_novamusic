const express = require("express");
const routes = express.Router();

const UserController= require("./controllers/UserController");
const CategoryController= require("./controllers/CategoryController");
const ScheludeController= require("./controllers/ScheduleController");
const AuthenticateController= require("./controllers/Authenticate");
const ProjectController= require("./controllers/projectController");
const AuthMiddlewares= require('./middlewares/auth');


routes.post("/users",UserController.store);
routes.put("/users/:id",UserController.update);
routes.put("/users/regainAccess/:email",UserController.reaginAccess);
routes.get("/users",UserController.list);
routes.get("/users/updateViews/:id",UserController.updateViews);
routes.delete("/users/:id",UserController.destroy);
routes.get("/users/:id",UserController.finduser);
routes.get("/users/category/:category",UserController.findusercategory);
routes.get("/users/stylemusic/:style_music",UserController.finduserstylemusic);
routes.post("/users/submitEmail/",UserController.submitEmailRegainAccess);

routes.post("/category",CategoryController.store);
routes.put("/category/:id",CategoryController.update);
routes.get("/category/",CategoryController.list);
routes.delete("/category/:id",CategoryController.destroy);
routes.get("/category/:id",CategoryController.findcategory);


routes.post("/schelude",ScheludeController.store);
routes.put("/schelude/:id",ScheludeController.update);
routes.get("/schelude/",ScheludeController.list);
routes.delete("/schelude/:id",ScheludeController.destroy);
routes.get("/schelude/:id",ScheludeController.findschedule);

routes.post("/authenticate",AuthenticateController.authenticate);

routes.use(AuthMiddlewares);
routes.get("/projects",ProjectController.exibir);

module.exports = routes;