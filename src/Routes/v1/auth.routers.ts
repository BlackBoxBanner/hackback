import express from "express"
import { Get, Post, signIn } from "@/Controllers/v1/auth.controllers"

const routers = express.Router()

routers.get("/user", Get)
routers.post("/signin", signIn)
routers.post("/signup", Post)

export default routers
