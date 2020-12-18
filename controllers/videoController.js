import "../db";
import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

// pug를 사용하려면 views 폴더를 만들고, pug파일을 만들고, render로 변경해준다.
export const home = async(req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos }); //첫번째 인자 템플릿mo, 두번째 인자 템플릿에 추가할 정보가 담긴 객체
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = async(req, res) => {
    const {
        query: { term: searchingBy },
    } = req;
    let videos = [];

    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: "i" },
        }).sort({ _id: -1 });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) => {
    const {
        body: { title, description },
        files: {
            videoFile: [{ path: videoPath }],
            posterFile: [{ path: posterPath }],
        },
    } = req;

    const newVideo = await Video.create({
        videoFileUrl: videoPath,
        posterFileUrl: posterPath,
        title,
        description,
        creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async(req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id)
            .populate("creator")
            .populate("comments");
        res.render("videoDetail", {
            pageTitle: video.title,
            video,
        });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditVideo = async(req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id);
        if (`${video.creator}` !== req.user.id) {
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async(req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;

    // const regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
    // const regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");
    // const content = `${description}`.replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>").replace(regEmail, "<a href='mailto:$1'>$1</a>");
    // console.log(content);
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async(req, res) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id);
        if (`${video.creator}` !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({ _id: id });
            console.log("Delete video successfuly!");
        }
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};

// Register Video views
export const postRegisterView = async(req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(400);
    } finally {
        res.end();
    }
};

// Register Comments
const NO_IMAGE = '/resources/noimage.png';
export const postAddComment = async(req, res) => {
    const {
        params: { id },
        body: { comment },
        user,
    } = req;

    try {
        const video = await Video.findById(id).populate("creator");
        const newComment = await Comment.create({
            text: comment,
            creator: user.id,
            avatarUrl: user.avatarUrl ? user.avatarUrl : NO_IMAGE,
            name: user.name ? user.name : "no name",
        });
        video.comments.push(newComment.id);
        res.json({ id: newComment.id });
        video.save();
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
};

// Delete Comments
export const postDeleteComment = async(req, res) => {
    const {
        params: { id },
        body: { commentId }
    } = req;

    try {
        const video = await Video.findById(id);
        video.comments.remove(commentId);
        video.save();
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
}