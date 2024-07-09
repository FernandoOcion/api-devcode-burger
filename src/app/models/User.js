import bcrypt from 'bcrypt';
import Sequelize, { Model } from "sequelize";

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            admin: Sequelize.BOOLEAN,
        },
            {
                sequelize,
            },
        );

        // yarn add bcrypt
        this.addHook('beforeSave', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 10);
            }
        })

        return this;
    }

    async checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;