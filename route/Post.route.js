const { Router } = require("express");
const { PostModel } = require("../model/Post.model");

const postRoute = Router();

postRoute.post("/create", async (req, res) => {
    try {
        const post = new PostModel(req.body);
        await post.save();
        res.status(200).send({ msg: "Post has been created" });
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

postRoute.get("/", async (req, res) => {
    try {
        const posts = await PostModel.find({ userId: req.body.userId });
        res.status(200).send(posts);
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

postRoute.patch("/update/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await PostModel.find({ _id: postId });
    try {
        if (post.userId != req.body.userId) {
            res.send({ msg: "You are not authorized" });
        } else {
            await PostModel.findByIdAndUpdate({ _id: postId }, req.body);
            res.status(200).send({ msg: "Data has been updated successfully" });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

postRoute.delete("/delete/:postId", async (req, res) => {
    const { postId } = req.params;
    const post = await PostModel.find({ _id: postId });
    try {
        if (post.userId != req.body.userId) {
            res.send({ msg: "You are not authorized" });
        } else {
            await PostModel.findByIdAndDelete({ _id: postId });
            res.status(200).send({ msg: "Data has been updated successfully" });
        }
    } catch (error) {
        res.status(400).send({ err: error.message });
    }
});

module.exports = { postRoute };
