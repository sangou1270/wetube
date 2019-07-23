import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();
import "./models/Video";
import "./models/Comment";
import "./models/User";
const PORT = process.env.PORT || 4000; // PORT는 .env에서 호출 함

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
