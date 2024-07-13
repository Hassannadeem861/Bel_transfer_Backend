const { DataTypes } = require("sequelize");

const CarBookingModel = (sequelize) => {
  const CarBooking = sequelize.define("CarBooking", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      // No need for validation here
    },

    sourceText: {
      type: DataTypes.STRING,
      allowNull: false,
      // Add any specific validation if needed

    },

    fromLocation: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      // validate: {
      //   isArray: {
      //     msg: 'fromLocation must be an array.',
      //   },
      // },
    },

    destinationText: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    toLocation: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      // validate: {
      //   isArray: {
      //     msg: 'toLocation must be an array.',
      //   },
      // },
    },

    extras: {
      type: DataTypes.STRING,
      allowNull: true,
      // Add any specific validation if needed
    },

    payment: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      // validate: {
      //   isArray: {
      //     msg: 'payment must be an array.',
      //   },
      // },

      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      // streetAddress: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return CarBooking;
};

module.exports = CarBookingModel;
