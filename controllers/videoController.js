import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); // await은 다음 과정이 끝날 때까지 잠시 기달려 달라는 의미다.
    // -1 위아래 정렬 순서를 변경할때 사용한다.

    res.render("home", { pageTitle: "Home", videos }); // await가 실행된후에 이줄의 코드가 실행된다.
  } catch (error) {
    res.render("home", { pageTitle: "Home", videos: [] }); // await가 실행된후에 이줄의 코드가 실행된다.
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" } // **검색 기능 꼭 기억할것 regex (regular expression), i 대소문자를 구별하지 않는다.
    });
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
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  // TODO 비디오 업로드 및 저장
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator"); // populate() == 객체를 데려오는 함수
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

// gitEditVideo == 탬플릿에 값을 뿌려주는 역할
export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    // eslint-disable-next-line eqeqeq
    if (video.creator == req.user.id) {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } else {
      throw Error();
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  // 실질적으로 업데이트하는 역할
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findByIdAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
    res.redirect(routes.home);
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
