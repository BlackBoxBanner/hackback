import express from "express"
import { Get, Post } from "@/Controllers/v1/default.controllers"

const routers = express.Router()

routers.get("/user", Get)
routers.post("/signin", Post)
routers.post("/signup", Post)

export default routers
