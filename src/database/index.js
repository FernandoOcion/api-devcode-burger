import mongoose from "mongoose";
import Sequelize from "sequelize";

import configDatabase from "../config/database";

import Category from "../app/models/Category";
import Product from "../app/models/Products";
import User from "../app/models/User";

const models = [User, Product, Category];

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(
			"postgresql://postgres:GJIbASbPtlEWCKlnBLynsxtpHpDUbLuo@autorack.proxy.rlwy.net:32192/railway",
		);
		models
			.map((model) => model.init(this.connection))
			.map(
				(model) => model.associate && model.associate(this.connection.models),
			);
	}

	mongo() {
		this.mongoConnection = mongoose.connect(
			"mongodb://mongo:JqFrJSKBmvBYDwKvxtAxklujMIBJSGLB@autorack.proxy.rlwy.net:41781",
		);
	}
}

export default new Database();
