import "./db";
import dotenv from "dotenv";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL;

const handleListening = () =>
    console.log(`✅ Listening on: ${PORT}`);

app.listen(PORT, handleListening);