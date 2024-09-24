const Router = require("express");
const multer = require("multer");
const authMiddleware = require("./app/Middlewares/auth.js");
const multerConfig = require("./config/multer.cjs");

const CategoryController = require("./app/controllers/CategoryController.js");
const OrderController = require("./app/controllers/OrderController.js");
const ProductController = require("./app/controllers/ProductController.js");
const SessionController = require("./app/controllers/SessionController.js");
const UserController = require("./app/controllers/UserController.js");

// import Router from "express";
// import multer from "multer";
// import authMiddleware from "./app/Middlewares/auth.js";
// import multerConfig from "./config/multer.cjs";

// import CategoryController from "./app/controllers/CategoryController.js";
// import OrderController from "./app/controllers/OrderController.js";
// import ProductController from "./app/controllers/ProductController.js";
// import SessionController from "./app/controllers/SessionController.js";
// import UserController from "./app/controllers/UserController.js";

const routes = new Router();

// routes.get("/", (req, res) => {
// 	return res.json({ message: "Hello to my first API" });
// });

const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
routes.post("/products", upload.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", upload.single("file"), ProductController.update);

routes.post("/categories", upload.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put("/categories/:id", upload.single("file"), CategoryController.update);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

module.exports = routes;
