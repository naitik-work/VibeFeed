const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imageKit/nodejs");
const { toFile } = require("@imageKit/nodejs");

let imageKit = null;
function getImageKit() {
    if (!imageKit) {
        const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
        if (!privateKey) {
            throw new Error("IMAGEKIT_PRIVATE_KEY is missing or empty in .env. Please provide a valid ImageKit private key.");
        }
        imageKit = new ImageKit({ privateKey });
    }
    return imageKit;
}

async function createPostController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required."
            });
        }

        const ik = getImageKit();
        const file = await ik.files.upload({
            file: await toFile(Buffer.from(req.file.buffer), "file"),
            fileName: req.file.originalname || "Vibe_" + Date.now(),
            folder: "cohort-2-insta-clone"
        });

        const post = await postModel.create({
            caption: req.body.caption || "",
            imgUrl: file.url,
            user: req.user.id
        });

        return res.status(201).json({
            message: "new post created succesfully.",
            post
        });
    } catch (error) {
        console.error("Create post error:", error.message);
        return res.status(500).json({
            message: error.message || "Failed to create post."
        });
    }
}

async function getPostController(req, res) {
    try {
        const userId = req.user.id;
        const posts = await postModel.find({ user: userId });

        return res.status(200).json({
            message: "Posts fetched successfully.",
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch posts."
        });
    }
}

async function getPostDetailsController(req, res) {
    try {
        const userId = req.user.id;
        const postId = req.params.postId;

        const post = await postModel.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        const isValidUser = post.user.toString() === userId;
        if (!isValidUser) {
            return res.status(403).json({
                message: "Forbidden Content."
            });
        }

        return res.status(200).json({
            message: "Post fetched successfully.",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch post details."
        });
    }
}

async function likePostController(req, res) {
    try {
        const username = req.user.username;
        const postId = req.params.postId;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        // Check if already liked
        const existingLike = await likeModel.findOne({ post: postId, user: username });
        if (existingLike) {
            await likeModel.findByIdAndDelete(existingLike._id);
            return res.status(200).json({
                message: "Post unliked successfully.",
                liked: false
            });
        }

        const like = await likeModel.create({
            post: postId,
            user: username
        });

        return res.status(200).json({
            message: "Post liked successfully.",
            like,
            liked: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to like post."
        });
    }
}

async function getFeedController(req, res) {
    try {
        const posts = await postModel.find().populate("user").sort({ _id: -1 });
        return res.status(200).json({
            message: "Posts fetched successfully.",
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Failed to fetch feed."
        });
    }
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController,
    getFeedController
};