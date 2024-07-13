const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.users;


const register = async (req, res) => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        console.log(
            "username, email, password =>",
            username,
            email,
            password,
            phoneNumber
        );

        if (!username || !email || !phoneNumber || !password) {
            res.status(403);
            res.send(`required parameters missing, 
                        example request body:
                    {
                        username: "abc name",
                        email: "abc email"
                        password: "abc password"
                        phoneNumber: "abc phoneNumber"
                      } `);
            return;
        }

        req.body.email = req.body.email.toLowerCase();

        const userEmail = await User.findOne({ where: { email: email } });
        console.log("userEmail:", userEmail);

        if (userEmail) {
            return res.status(403).json({
                message: "User email already exist please try a different email :",
            });
        }

        console.log(
            "User email already exists, please try a different email.",
            userEmail
        );

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashedPassword:", hashedPassword);

        // Create user with role
        const userCreated = await User.create({
            username,
            email,
            phoneNumber,
            password: hashedPassword,

        });

        console.log("create data in database:", userCreated);

        const token = jwt.sign({ userId: userCreated.id, email: userCreated.email }, "Hassan_Nadeem", { expiresIn: "1h" });
        console.log("register token :", token);
        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                userId: userCreated.id,
                username: userCreated.name,
                email: userCreated.email,
                password: userCreated.password,
                phoneNumber: userCreated.phoneNumber,
            },
        });
    } catch (error) {
        console.log("register error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("email, password :", email, password); // Check email and password types

        if (!email || !password) {
            res.status(403);
            res.send(`required parameters missing, 
                    example request body:
                {
                    email: "abc email"
                    password: "abc password"
                } `);
            return;
        }

        req.body.email = req.body.email.toLowerCase();

        const user = await User.findOne({ where: { email: email } });
        console.log("login user :", user); // Check if user object is retrieved

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        // console.log("user.password type:", typeof user.password); // Check type of user.password
        // console.log("password type:", typeof password); // Check type of password

        // Check if user.password is a valid hash
        const comparePassword = await bcrypt.compare(password, user.password);
        console.log("comparePassword result:", comparePassword); // Check result of comparison

        if (!comparePassword) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "Hassan_Nadeem",
            { expiresIn: "1h" }
        );
        console.log("login token :", token);
        res.status(201).json({
            message: "Login successful",
            token,
            user: {
                userId: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log("login error :", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    register,
    login,
};