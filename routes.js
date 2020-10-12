// Glabal
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id"; // 텍스트가 아닌 변수화 -> user/1;
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";


// Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit"; // -> videos/1/edit
const DELETE_VIDEO = "/:id/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,

    users: USERS,
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    userDetail: USER_DETAIL,

    vidoes: VIDEOS,
    upload: UPLOAD,
    videoDetail: VIDEO_DETAIL,
    editVideo: EDIT_VIDEO,
    deleteVideo: DELETE_VIDEO
}

export default routes;