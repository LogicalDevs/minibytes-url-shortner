import { Request, Response, NextFunction } from 'express';
import jwt_decode from "jwt-decode";
import { QueryResult } from 'pg';
import usersController from '../controllers/users.controller';
import { pool } from '../database';
import payload from '../interfaces/payload.interface';


export const allowAuth = async (req: Request, res: Response, urlID: number) => {

    const authHeader = req.headers.authorization;
    const headerID: payload = jwt_decode(authHeader!);
    
    const response: QueryResult = await pool.query(`SELECT id_user FROM urls WHERE id_url = ${urlID}`);

    if(headerID.id !== response.rows[0].id_user) return false;

    return true;
}

export default { allowAuth };
