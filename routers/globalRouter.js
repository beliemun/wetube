import express from "express";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout,
    githubLogin,
    postGithubLogin,
    kakaoLogin,
    postKakaoLogin,
    getMe,
} from "../controllers/userController";
import routes from "../routes";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate("github", { failureRedirect: routes.login }),
    postGithubLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate("kakao", { failureRedirect: routes.login }),
    postKakaoLogin
)

globalRouter.get(routes.me, onlyPrivate, getMe);

export default globalRouter;