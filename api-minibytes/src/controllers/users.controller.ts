import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';

const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response : QueryResult = await pool.query('SELECT * FROM users');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export default { getUsers };