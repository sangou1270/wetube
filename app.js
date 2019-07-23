import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localsMiddleware } from "./middleware";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

app.use(helmet());
app.set("view engine", "pug");

// *이 방법처럼 user에 해당하는 filedmf server에 저장하는건 좋지않다.
// 아래 코드를 통해서 /uploads 경로를 통해 uploads 디렉토리에 포함된 파일을 로드할 수 있음
app.use("/uploads", express.static("uploads")); // directory에서 file을 보내주는 middleware

app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
