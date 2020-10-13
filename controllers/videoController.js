// pug를 사용하려면 views 폴더를 만들고, pug파일을 만들고, render로 변경해준다.
export const home = (req, res) =>
    res.render("home", { pageTitle: "Home", potato: 12345 }); //첫번째 인자 템플릿, 두번째 인자 템플릿에 추가할 정보가 담긴 객체
export const search = (req, res) =>
    res.render("search", { pageTitle: "Search" });
export const upload = (req, res) =>
    res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
    res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
    res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
    res.render("deleteVideo", { pageTitle: "Delete Video" });