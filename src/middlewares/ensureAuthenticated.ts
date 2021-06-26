import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request:Request, response: Response, next: NextFunction) {
  //receber token
  const authToken = request.headers.authorization
  
  //validar se token esta preenchido
  if(!authToken) {
    return response.status(401).end();
  }
  
  //validar se token é valido
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "57266c38250d32eac28e8b5d47a57ff0") as IPayload;
    //recuperar informações do usuario
    request.user_id = sub;
    
    return next();
  } catch(err) {
    return response.status(401).end();
  }
}