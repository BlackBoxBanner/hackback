import express from "express"
import { Get, Post, signIn, signOut } from "@/Controllers/v1/auth.controllers"

const routers = express.Router()

routers.get("/user", Get)
routers.post("/signin", signIn)
routers.post("/signup", Post)
routers.post("/signout", signOut)

export default routers
