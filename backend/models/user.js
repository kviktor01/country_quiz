"use strict";
const sha256 = require("crypto-js/sha256");
const { Model } = require("sequelize");
const hashPassword = (user) =>
	(user.password = sha256(user.password).toString());
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				isUnique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			maxpoint: { type: DataTypes.INTEGER, defaultValue: 0 },
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: hashPassword,
			},
		}
	);
	return User;
};
