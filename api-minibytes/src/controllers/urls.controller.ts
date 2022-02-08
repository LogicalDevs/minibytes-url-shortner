import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import CryptoJS from 'crypto-js';

import { pool } from '../database';

import urlInterface from '../interfaces/url.interface';
import { verifyURL } from '../namespaces/url.namespace';
import { verifyTag } from '../namespaces/tags.namespace';
import allowAuth from '../middlewares/allow.auth';


export const getUrls = async (req: Request, res: Response): Promise<Response> => {
    try{
        const response : QueryResult = await pool.query('SELECT * FROM urls');
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const getUrlByID = async (req: Request, res: Response): Promise<Response> => {
    try{
        const linkID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`SELECT * FROM urls WHERE id_url = ${linkID}`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const createUrl = async (req: Request, res: Response): Promise<Response> => { 
    try{
        let { id_user, name_url, main_url, short_url, tags } = req.body;

        if(!id_user) return res.status(400).json("User ID must be inserted!")
        if(!Number(id_user)) return res.status(400).json("User ID must be a number!")

        const userVerification = await pool.query(`SELECT * FROM users WHERE id_user = ${id_user}`);
        if(!userVerification.rowCount) return res.status(400).json("User must exist!")

        if(!name_url) return res.status(400).json("URL Name must be inserted!")
        if(!main_url) return res.status(400).json("Main URL must be inserted!")
        if(!verifyURL.urlValidator.isValid(main_url)) return res.status(400).json("Main URL is not a valid URL!")
        if(!short_url) return res.status(400).json("Short URL must be inserted!")

        const verifyShortUrl : QueryResult = await pool.query(`SELECT count(*) FROM urls WHERE short_url = '${short_url}'`);
        if(verifyShortUrl.rows[0].count != 0) return res.status(400).json("Short URL must be unique!")

        if(!tags) return res.status(400).json("Tags must be inserted!")
        if(!verifyTag.tagValidator.isValid(tags)) return res.status(400).json("Tag is not a valid type!")

        let url: urlInterface;
        let created_in = Date.now();
        let qr_code = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + main_url;
        
        url = {
            id_user,
            name_url,
            created_in,
            main_url, 
            short_url,
            tags,
            qr_code
        }

        const response : QueryResult = await pool.query(`INSERT INTO urls (id_user, name_url, created_in, main_url, short_url, tags, qr_code) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [url.id_user, url.name_url, url.created_in, url.main_url, url.short_url, url.tags, url.qr_code]);
        
        return res.json({
            message: 'URL Created Successfully', 
            body: url
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const deleteUrlByID  = async (req: Request, res: Response): Promise<Response> => {
    try{
        const linkID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`DELETE FROM urls WHERE id_url = ${linkID}`);
        return res.json(`Link ${linkID} deleted sucessfully`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const updateUrlByID  = async (req: Request, res: Response): Promise<Response> => {
    
    const data = req.body
    const verifyOwnership = await allowAuth.allowAuth(req, res, data.user_id)

    if(!verifyOwnership) return res.status(401).json('Not authorized!')

    try{
        const linkID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`UPDATE urls SET name_url = '${data.name_url}', tags = '${data.tags}' WHERE id_url = ${linkID}`);
        return res.json(`Link ${linkID} updated sucessfully`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const getUrlByShortURL = async (req: Request, res: Response): Promise<Response> => {
    const data = req.body;

    try {
        const shortURL: string = req.params.shortURL;
        const response: QueryResult = await pool.query(`SELECT * FROM urls WHERE short_url = '${shortURL}'`);

        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}
export default { getUrls, getUrlByID, createUrl, deleteUrlByID, updateUrlByID, getUrlByShortURL };