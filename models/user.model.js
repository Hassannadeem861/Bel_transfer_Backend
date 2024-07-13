const { DataTypes } = require('sequelize');

const authenticationModel = (sequelize) => {
    const userModel = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false, // Name should be required
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // Email should be required
            unique: true, // Email should be unique
            // validate: {
            //     isEmail: true, // Validate email format
            // },
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false, // Password should be required
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Password should be required
        },

    });

    return userModel;
};

module.exports = authenticationModel;