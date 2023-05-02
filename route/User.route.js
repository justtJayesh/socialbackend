const { Router } = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = Router();

// Registration
userRoute.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ name, email, gender, password: hash });
            await user.save();
            res.status(200).send({ msg: "Registration Successfull." });
        });
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

// Login
userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign(
                        { userId: user._id },
                        "iliketwitter",
                        {
                            expiresIn: "3h",
                        }
                    );
                    res.status(200).send({
                        msg: "Login Successfully",
                        token: token,
                    });
                } else {
                    res.status(200).send({ msg: "Wrong Credentials" });
                }
            });
        } else {
            res.status(200).send({ msg: "Wrong Credentials" });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

module.exports = { userRoute };
