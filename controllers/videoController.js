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

export const videoDetail = async (req, res) =>{
  const{
    params: {id}
  }=req;
  try{
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch(error){
    res.redirect(routes.home);
  }
};
  

export const getEditVideo = async (req, res) => //gitEditVideo == 탬플릿에 값을 뿌려주는 역할
{
  const{
    params: {id}
  }= req;
  try{
    const video = await Video.findById(id);
    res.render("editVideo", {pageTitle: `Edit ${video.title}`, video})
  } catch(error){
    res.redirect(routes.home);
  }
};
  

export const postEditVideo = async (req, res) => {
  const{
    params: {id},
    body: {title, description}
  }= req;
  try{
    await Video.findByIdAndUpdate({ id }, {title, description});
    res.redirect(routes.videoDetail(id))
  }catch(error){
    res.redirect(routes.home);
  }
};

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" }); 