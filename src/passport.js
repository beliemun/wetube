import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";

import User from "./models/User";
import {
    githubLoginCallback,
    kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

// strategy : 로그인을 하는 방법
// serialization : '쿠키가 어떤 정보 줄 것인가'를 의미
// deserialization : '사용자가 누구인지 어떻게 찾지'를 의미

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `https://stormy-hollows-56478.herokuapp.com${routes.githubCallback}`
                // callbackURL: process.env.PRODUCTION ?
                //     `https://stormy-hollows-56478.herokuapp.com${routes.githubCallback}` :
                //     `http://localhost:4000${routes.githubCallback}`
        },
        githubLoginCallback
    )
);
passport.use(
    new KakaoStrategy({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
            callbackURL: `https://stormy-hollows-56478.herokuapp.com${routes.kakaoCallbacka}`
                // callbackURL: process.env.PRODUCTION ?
                //     `https://stormy-hollows-56478.herokuapp.com${routes.kakaoCallbacka}` :
                //     `http://localhost:4000${routes.kakaoCallbacka}`
        },
        kakaoLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());