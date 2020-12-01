import "../db";
import routes from "../routes";
import Video from "../models/Video";

// pug를 사용하려면 views 폴더를 만들고, pug파일을 만들고, render로 변경해준다.
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos }); //첫번째 인자 템플릿mo, 두번째 인자 템플릿에 추가할 정보가 담긴 객체
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];

  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }).sort({ _id: -1 });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    files: {
      videoFile: [{ path: videoPath }],
      posterFile: [{ path: posterPath }],
    },
  } = req;

  const newVideo = await Video.create({
    videoFileUrl: videoPath,
    posterFileUrl: posterPath,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("editVideo", {
      pageTitle: `Edit ${video.title}`,
      video,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
    console.log("delete video successfuly!");
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
