const express = require("express");
const authRouter = require("./routes/user.route");
const contactRoutes = require('./routes/contact.route');
const carBookingRoutes = require('./routes/car-booking.route');
const cors = require("cors");
const morgan = require("morgan");
const sequelize = require('./config/db.config');
const app = express();

// Initialize Sequelize
// (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection to database has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   })();
// app.use(
//     cors({
//         origin: 'http://127.0.0.1:5500/',
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         credentials: true,
//     })
// );

app.use(
    cors({
        origin: 'http://127.0.0.1:5500',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    })
);

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api", contactRoutes);
app.use("/api", carBookingRoutes);


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Hassan Nadeem application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});