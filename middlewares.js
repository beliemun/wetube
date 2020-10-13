import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    // locals를 이용해 전역 변수를 추가한다.
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    next(); // 다음 코드로 넘어가기 위해서 반드시 next()사용
};
