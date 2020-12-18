import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Creator is required",
        ref: "User",
    },
    text: {
        type: String,
        required: "Text is requeired",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
    },
    avatarUrl: String,
    name: String,
});

const model = mongoose.model("Comment", CommentSchema);
export default model;