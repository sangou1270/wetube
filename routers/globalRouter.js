import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  logout,
  postJoin,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  getMe
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin); // gitHub으로 갈 때, gitHubLogin이 실행되는데, 우리를 깃헙 웹사이트로 보내주는 역활을 한다.

/*
githubCallback(URL)로 돌아왔을 때, passport는 
내가 알려준 함수인 githubLoginCallback을 실행시킨다.
만약 user를 찾으면, passport는 !! 좋아!! 라고 통과시키면서 
postGithubLogin이 실행될 것이고 (home으로 redirect) 쿠키를 만들어서 저장해줄 것이다.
user를 찾지 못하면, passport는 /login 화면으로 redirect 시키게 된다.
즉, cb 함수를 호출할 때 user 없이 error가 들어가면 passport는 errorrk 있음을 알고 /login 화면으로 보내버린다.
error가 없다고(null) 하고 user를 넣어서 cb 함수를 호출하면, passport는 여기 나열된 일들을 처리하고, 
1) cookie = makeCookie(User)
2) savedCookie = saveCookie(cookie)
3) sendCookie(saveCookie)
postGithubLogin을 실행시켜서 home 화면으로 redirect 하게끔 만든다.
*/
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postGithubLogin
);
globalRouter.get(routes.me, getMe);
export default globalRouter;
