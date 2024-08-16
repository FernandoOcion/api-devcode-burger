// npm init -y
// npm install express
// yarn add nodemon -D
// no package.json, mudar o main se necessário
// yarn sucrase -D (Para usar (import BLABLA from 'BLABLA'))
// criar o arquivo nodemon.json com o que está escrito dentro
// yarn dev
// yarn add cors

import cors from "cors";
import express from "express";
import { resolve } from "node:path";
import "./database";
import routes from "./routes";

class App {
	constructor() {
		this.app = express();

		this.app.use(cors());
		this.middlewares();
		this.routes();
	}
	middlewares() {
		this.app.use(express.json());
		this.app.use(
			"/product-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);

		this.app.use(
			"/category-file",
			express.static(resolve(__dirname, "..", "uploads")),
		);
	}

	routes() {
		this.app.use(routes);
	}
}

export default new App().app;
