import prisma from "@/utils/prisma"
import type { Request, Response, NextFunction } from "express"
import { hash } from "bcrypt"
import { Auth } from "@prisma/client"

export async function Get(req: Request, res: Response, next: NextFunction) {
  const data = await prisma.auth.findMany()

  return res.json({
    method: "GET",
    message: "GET Method is working",
    query: data
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
      return res.cookie("auth-session", await hash(JSON.stringify(result), 10)).json({
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
      password: string
      firstname: string
      lastname: string
      email: string
      phone: string
      role: "member" | "admin"
    }

    const { username, password, firstname, lastname, email, phone } = req.body as CreateUser

    const findExistUser = await prisma.auth.findFirst({ where: { username } })
    console.log(findExistUser)
    if (findExistUser != null) {
      return res.json({
        method: "POST",
        message: "Already have this username",
      })
    }

    const result = await prisma.auth.create({
      data: {
        username, password, firstname, lastname, email, phone
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

export async function signOut(req: Request, res: Response, next: NextFunction) {

  try {

    return res.clearCookie("auth-session").json({
      method: "POST",
      message: "",
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