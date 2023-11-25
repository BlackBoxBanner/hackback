import type { Request, Response } from "express"
import prisma from "./prisma"

export async function checkAdmin(req: Request, res: Response,) {
  const headers = (req.headers.authorization)?.split(" ")
  const data = atob(headers![1]).split(":")

  const admin = await prisma.auth.findFirst({ where: { username: data[0], password: data[1] } })

  return admin && admin.role === "member"
}