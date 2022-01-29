import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from '../database';


export const getLinks = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response : QueryResult = await pool.query('SELECT * FROM links');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const getLinkByID = async (req: Request, res: Response): Promise<Response> => {
    try{
        const linkID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`SELECT * FROM links WHERE id_link = ${linkID}`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const createLink = async (req: Request, res: Response): Promise<Response> => { 
    try{
        const { org_link, min_link } = req.body;
        const response: QueryResult = await pool.query(`INSERT INTO links (org_link, min_link) VALUES ($1, $2)`, [ org_link, min_link ]);

        return res.json({
            message: 'Link Created Sucessfully', 
            body: {
                org_link,
                min_link
            }
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const deleteLinkByID  = async (req: Request, res: Response): Promise<Response> => {
    try{
        const linkID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`DELETE FROM links WHERE id_link = ${linkID}`);
        return res.json(`Link ${linkID} deleted sucessfully`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}