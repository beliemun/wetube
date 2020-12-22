import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";
import Video from "./models/Video";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
})

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: "nicotube/videos"
    })
});

export const uploadVideo = multerVideo.fields([
    { name: "videoFile" },
    { name: "posterFile" },
]);

export const deleteVideoFile = async(req, res, next) => {
    const {
        params: { id },
    } = req;

    try {
        const video = await Video.findById(id);
        if (`${video.creator}` !== req.user.id) {
            throw Error();
        } else {
            const videoFileUrl = video.videoFileUrl.split('/');
            const videoFileName = videoFileUrl[videoFileUrl.length - 1];
            console.log("1", videoFileName);
            const videoParams = {
                Bucket: "nicotube/videos",
                Key: videoFileName
            }
            s3.deleteObject(videoParams, (err, data) => {
                if (err) {
                    console.log("Failed delete video!")
                    console.log(err);
                } else {
                    console.log("Deleted video");
                }
            });

            const posterFileUrl = video.posterFileUrl.split('/');
            const posterFileName = posterFileUrl[posterFileUrl.length - 1];
            console.log("2", posterFileName);
            const posterParams = {
                Bucket: "nicotube/videos",
                Key: posterFileName
            }
            s3.deleteObject(posterParams, (err, data) => {
                if (err) {
                    console.log("Failed delete video!")
                    console.log(err);
                } else {
                    console.log("Deleted poster");
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
    next();
};

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: "nicotube/avatars"
    })
});

export const uploadAvatar = multerAvatar.single("avatarFile");

export const localsMiddleware = (req, res, next) => {
    // locals를 이용해 전역 변수를 추가한다.
    res.locals.siteName = "NicoTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;

    // 정책상 영상을 로드하지 못함
    res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' https://archive.org"
    );
    next(); // 다음 코드로 넘어가기 위해서 반드시 next()사용
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};