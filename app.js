import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// delfault로 export 하지 않았으므로 {}안에 써준다.
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import routes from "./routes";

const app = express();

app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // 보안 미들웨어
app.use(morgan("dev")); // 기록 미들웨어

// get이 아니라 use라는 것이 중요!
// "/use"에 접근하면 두번째 함수를 실행하겠다는 의미
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.vidoes, videoRouter);

export default app;