const db = require("../models");
const carBooking = db.carbookings;
const User = db.users;


const createCarBooking = async (req, res) => {
  try {
    const { name, email, phoneNumber, vehicle, sourceText, fromLocation, destinationText, toLocation,  extras, payment, date, time, userId } = req.body;
    console.log(
      "name, email, phoneNumber, vehicle, sourceText, fromLocation, destinationText, toLocation,  extras, payment, date, time, userId  =>",
      req.body
    );

    if (!name || !email || !phoneNumber || !vehicle || !sourceText || !fromLocation || !destinationText || !toLocation || !extras || !payment || !date || !time || !extras) {
      res.status(403).send(`required parameters missing, 
                    example request body:
                    {
                        name: "abc name",
                        email: "abc email",
                        phoneNumber: "abc phoneNumber",
                        vehicle: "abc vehicle",
                        sourceText: "abc sourceText",
                        fromLocation: "abc fromLocation",
                        destinationText: "abc destinationText",
                        toLocation: "abc toLocation",
                        extras: "abc extras",
                        payment: "abc payment",
                        date: "abc date",
                        time: "abc time"
                    }`);
      return;
    }
    // Check if userId belongs to the logged-in user or if the user has the necessary permissions
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(403).json({ error: "Please Login." });
    }

    // Create the car booking
    const newBooking = await carBooking.create(req.body);


    console.log("create data in database:", newBooking);

    res.status(201).json({
      message: "Car booking created successfully",
      // data: newBooking,
      newBooking: {
        id: newBooking?.id,
        name: newBooking?.name,
        email: newBooking?.email,
        phoneNumber: newBooking?.phoneNumber,
        vehicle: newBooking?.vehicle,
        source_text: newBooking?.source_text,
        fromLocation: newBooking?.fromLocation,
        destinationText: newBooking?.destinationText,
        toLocation: newBooking?.toLocation,
        extras: newBooking?.extras,
        payment: newBooking?.payment,
        date: newBooking?.date,
        time: newBooking?.time,
        userId: newBooking?.userId,
      },
    })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCarBooking = async (req, res, next) => {
  try {
    const CarBooking = await carBooking.findAll();
    if (!CarBooking || CarBooking.length === 0) {
      return res.status(404).json({
        message: "CarBooking not found",
      });
    }
    console.log("CarBooking :", CarBooking);
    return res.status(200).json({
      message: "Get All Car Booking Successfull",
      CarBooking,
    });
  } catch (error) {
    next(error);
    console.log("CarBooking error :", error);
    res.status(500).json({ message: "internal server" });
  }
};

const getSingleCarBooking = async (req, res) => {
  const id = req.params.id;
  console.log("get single contact id :", id);
  carBooking.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Contact with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Contact with id=" + id,
      });
    });
};

// // Update User Logic
const singleUpdateCarBooking = async (req, res) => {
  const id = req.params.id;
  console.log("updateUserById :", id);

  carBooking.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          id,
          message: "singleUpdateCarBooking was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update singleUpdateCarBooking with id=${id}. Maybe singleUpdateCarBooking was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating singleUpdateCarBooking with id=" + id,
      });
    });
};

// // delete User Logic
const singleDeleteCarBooking = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("deleteUserById :", id);
    const deleteUser = await carBooking.destroy({ where: { id: id } });
    console.log("deleteUser :", deleteUser);
    res.status(201).json({
      id,
      message: "singleDeleteCarBooking was deleted successfully!",
    });
  } catch (error) {
    console.log("deleteUserById Error :", error);
  }
};

// delete all contact Logic
const deleteAllCarBookings = async (req, res) => {
  carBooking.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} deleteAllCarBookings were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contact.",
      });
    });
};

module.exports = {
  createCarBooking,
  getAllCarBooking,
  getSingleCarBooking,
  singleUpdateCarBooking,
  singleDeleteCarBooking,
  deleteAllCarBookings,
};
