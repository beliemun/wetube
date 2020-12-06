import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

// strategy : 로그인을 하는 방법
// serialization : '쿠키가 어떤 정보 줄 것인가'를 의미
// deserialization : '사용자가 누구인지 어떻게 찾지'를 의미

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`
        },
        // 깃헙에서 돌아오는 과정
        githubLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());