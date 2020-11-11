import routes from "../routes";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
  const {
    body: { password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // To Do: Resister User
    // To Do: Log User in
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log in" });
};

export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: Progress Log Out
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });