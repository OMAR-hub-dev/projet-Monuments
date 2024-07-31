import express from 'express';
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";

const app = express();
app.use(express.json());

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const port = process.env.PORT || 8800;

app.listen(port, () => {
    console.log("Server is running!");
});
