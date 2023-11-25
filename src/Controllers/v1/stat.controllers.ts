import prisma from "@/utils/prisma"
import type { Request, Response, NextFunction } from "express"

export async function Get(req: Request, res: Response, next: NextFunction) {

    let currentDate = new Date();
    let sixmon = new Date();
    sixmon.setMonth(sixmon.getMonth() - 6)
    const statSixMount = await prisma.danger.count({where: {
        timelineStart: {
            lte: currentDate,
            gte: sixmon,
        }
    }} )

  res.json({
    method: "GET",
    message: "Counting ",
    statSixMount
  })
}
