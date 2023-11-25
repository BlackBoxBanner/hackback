//SECTION - import
//NOTE - ExpressJS
import express, { Express, NextFunction, Request, Response } from 'express'
import cookieParser from "cookie-parser"
import bodyParser, { BodyParser } from 'body-parser';

import cors from "cors"
//NOTE - Router
import templateRouter from '@/Routes/template.routers'
import defaultRouter from '@/Routes/v1/default.routers'
import authRouter from "@/Routes/v1/auth.routers"
import dangerRouter from "@/Routes/v1/danger.routers"
import statRouter from "@/Routes/v1/stat.routes"

//NOTE - ENV
import 'dotenv/config'
//!SECTION

if (!process.env.WEB_ORIGIN) {
  new Error("There is no WEB_ORIGIN in the .env file.")
}

//SECTION - express
const app: Express = express()
app.use(cors({
  origin: process.env.WEB_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type"],

}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.enable('trust proxy');
app.use(cookieParser(process.env.COOKIE_SECRET));
//NOTE - declare routes
app.use("/api/", defaultRouter)
app.use("/api/template", templateRouter)
app.use("/api/auth", authRouter)
app.use("/api/danger", dangerRouter)
app.use("/api/stat", statRouter)
//!SECTION

app.use(function (req, res, next) {
  console.log('req.url', req.url);
  // res.redirect('/login');
});

//SECTION - start application
const port = process.env.PORT
app.listen(port, () => console.log(`Application is running on port ${port}`))
//!SECTION