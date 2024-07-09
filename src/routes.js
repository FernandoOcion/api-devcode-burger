import Router from 'express';
import multer from "multer";
import authMiddleware from './app/Middlewares/auth';
import multerConfig from "./config/multer";

import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

const upload = multer(multerConfig)

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);


export default routes;