// pug를 사용하려면 views 폴더를 만들고, pug파일을 만들고, render로 변경해준다.
export const home = (req, res) => res.render("home");
export const search = (req, res) => res.render("search");

export const vidoes = (req, res) => res.render("vidoes");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");