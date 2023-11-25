import prisma from "@/utils/prisma"
import type { Request, Response, NextFunction } from "express"

export async function Get(req: Request, res: Response, next: NextFunction) {

  let currentDate = new Date();
  let sixmon = new Date();
  sixmon.setMonth(sixmon.getMonth() - 6)
  const statSixMount = await prisma.danger.count({
    where: {
      timelineStart: {
        lte: currentDate,
        gte: sixmon,
      }
    }
  })

  const danger = await prisma.danger.findMany()

  type RatingType = {
    "1": number
    "2": number
    "3": number
    "4": number
    "5": number
    "6": number
    "7": number
    "8": number
    "9": number
  }

  const ratingCount = danger.reduce((acc, dangerItem) => {
    if (dangerItem.rating >= 1 && dangerItem.rating <= 9) {
      acc[dangerItem.rating.toString()] += 1;
    }
    return acc;
  }, {} as Record<string,number>);

  res.json({
    method: "GET",
    message: "Counting ",
    statSixMount
  })
}
