const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./route/User.route");
const { postRoute } = require("./route/Post.route");
const { auth } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

// protected route
app.use(auth);
app.use("/posts", postRoute);

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log({ error: error.message });
        console.log("Something went wrong");
    }
    console.log(`Server is running ${process.env.port}`);
});
