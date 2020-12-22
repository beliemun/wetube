import passport from "passport";
import routes from "../routes";
import User from "../models/User";

const NO_IMAGE = '/resources/noimage.png';

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async(req, res, next) => {
    const {
        body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email,
                avatarUrl: NO_IMAGE,
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Log in" });
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});

// passport.js의 Github strategy가 동작.
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async(
    accessToken,
    refreshToken,
    profile,
    cb
) => {
    const {
        _json: { id: githubId, avatar_url: avatarUrl, login: name, email },
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            if (user.avatarUrl === NO_IMAGE && avatarUrl) {
                user.avatarUrl = avatarUrl;
            }
            user.githubId = githubId;
            user.save();
            return cb(null, user); // 첫번째 매개변수 : 에러 없음, 두번째 매개변수 : 찾은 user
        } else {
            const newUser = await User.create({
                name,
                email,
                githubId,
                avatarUrl: !avatarUrl ? NO_IMAGE : avatarUrl
            });
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async(
    accessToken,
    refreshToken,
    profile,
    cb
) => {
    const {
        _json: {
            id: kakaoId,
            properties: {
                nickname: name,
                profile_image_url: avatarUrl
            },
            kakao_account: {
                email,
            },
        }
    } = profile;
    const user = await User.findOne({ email });
    try {
        if (user) {
            if (user.avatarUrl === NO_IMAGE && avatarUrl) {
                user.avatarUrl = avatarUrl;
            }
            user.kakaoId = kakaoId;
            user.save();
            return cb(null, user);
        } else {
            const newUser = await User.create({
                name,
                email,
                kakaoId,
                avatarUrl: !avatarUrl ? '/resources/noimage.png' : avatarUrl
            })
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
}

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout(); // passport가 logout 해줌
    res.redirect(routes.home);
};

export const getMyPofile = async(req, res) => {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "My Profile", user });
};

export const userDetail = async(req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const user = await User.findById(id).populate("videos");
        res.render("userDetail", { pageTitle: "Detail", user });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditProfile = async(req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const user = await User.findById(id);
        if (req.user.id !== user.id) {
            throw Error();
        }
        res.render("editProfile", { pageTitle: "Edit Profile", user });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const postEditProfile = async(req, res) => {
    const {
        body: { name, email },
        params: { id },
    } = req;
    try {
        const user = await User.findById(id);
        user.name = name;
        user.email = email;
        if (req.file) {
            user.avatarUrl = routes.home + req.file.path;
        }
        user.save();
        res.redirect(routes.userDetail(id));
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const getChangePassword = async(req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id);
        res.render("changePassword", { pageTitle: "Change Password", user });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const postChangePassword = (req, res) => {
    const {
        body: {
            password,
            newPassword,
            confirmPassword
        },
        params: { id }
    } = req;
    try {
        if (newPassword !== confirmPassword) {
            res.status(400);
            res.redirect(routes.changePassword(id));
            return;
        }
        req.user.changePassword(password, newPassword);
        res.redirect(routes.myProfile);
    } catch (error) {
        res.status(400);
        res.redirect(routes.changePassword(id));
    }
}

export const postCheckLogin = (req, res) => {
    const {
        user
    } = req;
    if (user) {
        res.json({
            name: user.name,
            avatarUrl: user.avatarUrl,
        })
    } else {
        res.status(204);
    }
    res.end();
}