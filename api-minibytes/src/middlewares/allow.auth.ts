import { Request, Response, NextFunction } from 'express';
import jwt_decode from "jwt-decode";
import usersController from '../controllers/users.controller';
import payload from '../interfaces/payload.interface';


export const allowAuth = async (req: Request, res: Response, incomingUserID: number) => {

    const authHeader = req.headers.authorization;
    const headerID: payload = jwt_decode(authHeader!);
    
    const loggedUserID = await usersController.getUserByIDAllowAuth(req, res, incomingUserID)
    
    if(headerID.id !== loggedUserID.id_user) return false;

    return true;
}

export default { allowAuth };
