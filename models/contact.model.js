const { DataTypes } = require("sequelize");

const contactModel = (sequelize) => {
  const Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Email should be required
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false, // Email should be required
      // unique: true, // Email should be unique
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false, // Email should be required
      // unique: true, // Email should be unique
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false, // userId should be required
    //   // validate: {
    //   //   isNumeric: true,
    //   // },
    // },
  });

  return Contact;
};

module.exports = contactModel;
