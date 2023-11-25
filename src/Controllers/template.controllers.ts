import type { Request, Response, NextFunction } from "express"

export function Get(req: Request, res: Response, next: NextFunction) {
  res.json({
    method: "GET",
    message: "Express template",
    query: req.query
  })
}

export function Post(req: Request, res: Response, next: NextFunction) {
  res.json({
    method: "POST",
    message: "Express template",
    body: req.body
  })
}