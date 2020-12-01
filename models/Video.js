import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  videoFileUrl: {
    type: String,
    required: "Video file URL is required", // fileURL값이 없는 Video를 생성하려할 때 이 경고를 받음.
  },
  posterFileUrl: {
    type: String,
    required: "Poster file URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const model = mongoose.model("Video", VideoSchema);
export default model;
