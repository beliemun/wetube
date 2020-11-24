import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // 업로드 될 서버 경로
export const uploadVideo = multerVideo.single("videoFile");

export const localsMiddleware = (req, res, next) => {
  // locals를 이용해 전역 변수를 추가한다.
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    // isAuthenticated: false,
    id: 1,
  };
  // 정책상 영상을 로드하지 못함
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://archive.org"
  );
  next(); // 다음 코드로 넘어가기 위해서 반드시 next()사용
};
