import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

declare namespace Express {
  export interface Request {
    user?: any;
  }
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token) {
    return res.status(401).json({
      status: 401,
      name: 'Authorization Error',
      message: 'No token found'
    })
  }

  try {
    const verified = jwt.verify(token, 'meu_segredo_mais_importante')
    req.user = verified
    next()
  } catch(err) {
    return res.status(403).json({
      status: 403,
      name: 'Forbidden Error',
      message: 'Invalid token'
    })
  }
}