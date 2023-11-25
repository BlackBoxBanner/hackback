import prisma from "@/utils/prisma"
import cookieParser from "cookie-parser"
import type { Request, Response, NextFunction } from "express"

export function Get(req: Request, res: Response, next: NextFunction) {

  res.json({
    method: "GET",
    message: "GET Method is working",
    query: req.query
  })
}

export async function signIn(req: Request, res: Response, next: NextFunction) {

  try {
    type createSignin = {
      username: string
      password: string
    }

    const { username, password } = req.body as createSignin

    const result = await prisma.auth.findFirst({ where: { username, password } })

    if (result != null) {
      await res.cookie("auth-session", result)
      return res.json({
        method: "POST",
        message: "login succesfuly",
        result
      })
    }

    return res.json({
      method: "POST",
      message: "username or password incorrect",
      result
    })

  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        error: err.message
      })
    }
    res.status(400).json({
      error: "internal error"
    })
  }

}

export async function Post(req: Request, res: Response, next: NextFunction) {

  try {
    type CreateUser = {
      username: string
      password: string,
    }

    const { username, password } = req.body as CreateUser

    const findExistUser = await prisma.auth.findFirst({ where: { username } })

    if (findExistUser != null) {
      return res.json({
        method: "POST",
        message: "Already have this username",
      })
    }

    const result = await prisma.auth.create({
      data: {
        username, password
      }
    })

    res.json({
      method: "POST",
      message: "Create user succesfuly",
      result
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({
        error: err.message
      })
    }
    res.status(400).json({
      error: "internal error"
    })
  }

}