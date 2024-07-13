const db = require("../models");
const Contact = db.contacts;
const User = db.users;

const contact = async (req, res) => {
  try {
    const { name, email, subject, message} = req.body;
    console.log(
      "name, email, subject, message, userId  =>",
      name,
      email,
      subject,
      message,
    );

    if (!name || !email || !subject || !message) {
      res.status(403);
      res.send(`required parameters missing, 
              example request body:
              {
                  name: "abc name",
                  email: "abc email",
                  subject: "abc subject",
                  message: "abc message",
              }`);
      return;
    }



    // // Check if userId belongs to the logged-in user or if the user has the necessary permissions
    // const user = await User.findByPk(userId);
    // if (!user) {
    //   return res.status(403).json({ error: "Please Login." });
    // }


    // Create user with role
    const contactCreated = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    console.log("create data in database:", contactCreated);

    res.status(201).json({
      loggedIn: true,
      message: "Contact Successful",
      contactUser: {
        id: contactCreated?.id,
        name: contactCreated?.name,
        email: contactCreated?.email,
        subject: contactCreated?.subject,
        message: contactCreated?.message,
        userId: contactCreated?.userId,
      },
    });
  } catch (error) {
    console.log("create contact error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.findAll();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        message: "Contacts not found",
      });
    }
    console.log("contacts :", contacts);
    return res.status(200).json({
      message: "Get All Contacts Successfull",
      contacts,
    });
  } catch (error) {
    next(error);
    console.log("getAllUsers error :", error);
    res.status(500).json({ message: "internal server" });
  }
};

const getSingleUser = async (req, res) => {
  const id = req.params.id;
  console.log("get single contact id :", id);
  Contact.findByPk(id)
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

// Update User Logic
const singleUpdateUser = async (req, res) => {
  const id = req.params.id;
  console.log("updateUserById :", id);

  Contact.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          id,
          message: "contact was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update contact with id=${id}. Maybe contact was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating contact with id=" + id,
      });
    });
};

// delete User Logic
const singleDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("deleteUserById :", id);
    const deleteUser = await Contact.destroy({ where: { id: id } });
    console.log("deleteUser :", deleteUser);
    res.status(201).json({
      id,
      message: "Single Contact was deleted successfully!",
    });
  } catch (error) {
    console.log("deleteUserById Error :", error);
  }
};

// delete all contact Logic
const deleteAllContacts = async (req, res) => {
  Contact.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Contact were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Contact.",
      });
    });
};

module.exports = {
  contact,
  getAllContacts,
  getSingleUser,
  singleUpdateUser,
  singleDeleteUser,
  deleteAllContacts,
};
