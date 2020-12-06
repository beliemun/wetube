import passport from "passport";
import routes from "../routes";
import User from "../models/User";

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
                email
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

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

// passport.js의 Github strategy가 동작.
export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async(accessToken, refreshToken, profile, cb) => {
    const { _json: { id, avatar_url, name, email } } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user); // 첫번째 매개변수 : 에러 없음, 두번째 매개변수 : 찾은 user
        } else {
            const newUser = User.create({
                name,
                email,
                githubId: id,
                avatarUrl: avatar_url,
            })
            return cb(null, newUser);
        }
    } catch (error) {
        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout(); // passport가 logout 해줌
    res.redirect(routes.home);
};

export const userDetail = (req, res) =>
    res.render("userDetail", { pageTitle: "Detail" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });