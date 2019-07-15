import routes  from "../routes"
import Video from "../models/Video";

export const home = async(req, res) => {
  try{
    const videos = await Video.find({});//await은 다음 과정이 끝날 때까지 잠시 기달려 달라는 의미다.
    res.render("home",{ pageTitle: "Home", videos });//await가 실행된후에 이줄의 코드가 실행된다.
  }catch(error){
    console.log(error);
    res.render("home",{ pageTitle: "Home", videos: [] });//await가 실행된후에 이줄의 코드가 실행된다.
  }
};

export const search = (req, res) => {
  const { 
    query: { term: searchingBy } 
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) =>
//     res.render("videos", { pageTitle: "videos" });

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async(req, res) =>{
  const { 
    body: { title, description },
    file : { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo)
  // TODO 비디오 업로드 및 저장
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" }); 