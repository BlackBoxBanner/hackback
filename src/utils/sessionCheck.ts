import type { Request, Response } from "express"
import Cookie from "cookies"

export async function checkAdmin(req: Request, res: Response,) {
  const cookie = new Cookie(req, res)

  const headers = (req.headers.authorization)?.split(" ")
  console.log(headers);
  // const admin = 
  

  // atob()

  
}