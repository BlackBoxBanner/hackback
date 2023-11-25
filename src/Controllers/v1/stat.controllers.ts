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

    const rating = danger.reduce((result, next) => {
        result.push(next.rating)
        return result
    }, [] as number[])

    const rateList = rating.sort((a, b) => a + b).reduce((result, next) => {
        if(isNaN(result[next])){
            result[next] = 0
        }
        
        result[next] = Number(result[next]) + next
        return result
    }, {} as Record<number, number>)

    res.json({
        method: "GET",
        message: "Counting ",
        statSixMount,
        rateList

    })
}
