import type { Request, Response, NextFunction } from "express"

export function Get(req: Request, res: Response, next: NextFunction) {
  res.json({
    method: "GET",
    message: "GET Method is working",
    query: req.query
  })
}

export function Post(req: Request, res: Response, next: NextFunction) {
  res.json({
    method: "POST",
    message: "POST Method is working",
    body: req.body
  })
}