// // Middleware to check if user is logged in
// const isLoggedIn = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.status(403).send("Unauthorized access");
// };

// module.exports = isLoggedIn;
