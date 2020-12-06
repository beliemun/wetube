// 임포트는 알파벳 순서
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
// delfault로 export 하지 않았으므로 {}안에 써준다.
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet()); // 보안 미들웨어
app.set("view engine", "pug"); // 이 설정을 하면 render함수가 /view에서 pug파일을 찾을 수 있다.
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use("/resources", express.static("resources"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // 기록 미들웨어
app.use(
    session({
        secret: process.env.COOKIE_SCRET,
        resave: true,
        saveUninitialized: false,
        // mongoose가 이 저장소를 mongoDB에 연결해 줌
        // 즉, 이 CookieStore(session 정보)를 DB에 연결해야 하기 때문에 사용한다.
        store: new CookieStore({
            mongooseConnection: mongoose.connection,
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter); // get이 아니라 use라는 것이 중요! // "/use"에 접근하면 두번째 함수를 실행하겠다는 의미
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;