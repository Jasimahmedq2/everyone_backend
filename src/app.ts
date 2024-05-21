import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalMiddleware from "./app/middleware/globalErrorHandler";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "./config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    secret: config.session_secret as string,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send(`yee, the server is running successfully on`);
});

app.use(globalMiddleware);

export default app;
