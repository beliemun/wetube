import mongoose from "mongoose";
import dotenv from "dotenv";
import "./models/Video";

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL_PROD {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true, // 경고를 없애주기 위해 사용
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Conneted to DB");
const handleError = () => console.log(`❌ Error on DB Connections`);

// 한 번만 실행됨
db.once("open", handleOpen);
db.on("error", handleError);