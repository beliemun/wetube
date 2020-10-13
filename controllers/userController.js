export const join = (req, res) =>
    res.render("join", { pageTitle: "Join" });
export const login = (req, res) =>
    res.render("login", { pageTitle: "Log in" });
export const logout = (req, res) =>
    res.render("logout", { pageTitle: "Log out" });
export const userDetail = (req, res) =>
    res.render("userDetail", { pageTitle: "Detail" });
export const editProfile = (req, res) =>
    res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
    res.render("changePassword", { pageTitle: "Change Password" });