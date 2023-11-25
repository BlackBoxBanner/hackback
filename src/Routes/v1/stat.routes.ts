import express from "express"
import { Get } from "@/Controllers/v1/stat.controllers"

const routers = express.Router()

routers.get("/", Get)
// routers.post("/", Post)

export default routers