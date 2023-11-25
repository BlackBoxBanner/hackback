import prisma from "@/utils/prisma"
import { checkAdmin } from "@/utils/sessionCheck"
import { ConstructionType } from "@prisma/client"
import type { Request, Response, NextFunction } from "express"

export async function Get(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query

    if (!(await checkAdmin(req, res))) return res.status(400).json({
      error: "No auth"
    })

    if (query.status) {
      let dangers = await prisma.danger.findMany({
        where: {
          status: Boolean(query.status)
        }
      })
      return res.json({
        method: "GET",
        message: dangers,
      })
    }

    let dangers = await prisma.danger.findMany()

    res.json({
      method: "GET",
      message: dangers,
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
    type CreateDanger = {
      name?: string
      latitude?: string,
      longitude?: string,
      timelineStart?: Date,
      timelineEnd?: Date,
      constructionType: ConstructionType
      rating: number,
      status?: boolean
    }

    const { name, latitude, longitude, timelineStart, timelineEnd, rating, status, constructionType } = req.body as CreateDanger

    const result = await prisma.danger.create({
      data: {
        name, latitude, longitude, timelineStart, timelineEnd, rating, status, constructionType
      }
    })
    res.json({
      method: "POST",
      result: "Danger POST Method is working",
      body: req.body
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
