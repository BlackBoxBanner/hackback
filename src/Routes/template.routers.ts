import express from "express"
import { Get, Post } from "@/Controllers/template.controllers"

const routers = express.Router()

routers.get("/", Get)
routers.post("/", Post)

export default routers