import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import { pool } from '../database';

import userInterface from '../interfaces/user.interface';
import { verifyPassword } from '../namespaces/password.namespace';


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

export const getUserByID = async (req: Request, res: Response): Promise<Response> => {
    try{
        const userID = parseInt(req.params.id)
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE id_user = ${userID}`);
        return res.json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const getUserByIDAllowAuth = async (req: Request, res: Response, incomingUserID: number) => {
    try{
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE id_user = ${incomingUserID}`);
        return response.rows[0];
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export const getUserByUsername = async (req: Request, res: Response) => {
    try{
        let { username } = req.body
        const response: QueryResult = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);
        return response.rows[0];
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

const findUsernames = async (req: Request, res: Response) => {
    try{
        let { username } = req.body
        const response: QueryResult = await pool.query(`SELECT count(*) AS Duplicate FROM users WHERE username = '${username}'`);
        return Number(response.rows[0].duplicate);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

const getPasswordHash = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const createUser = async (req: Request, res: Response): Promise<Response> => { 
    try{
        let { name_user, username, password, confirmpassword, acc_type } = req.body;

        if(!name_user) return res.status(400).json("User Name must be inserted!")
        if(!username) return res.status(400).json("Username must be inserted!")

        let usernameDB = await findUsernames(req, res)
        if(usernameDB !== 0) return res.status(400).json("Username already exists!")

        if(username.length <= 3) return res.status(400).json("Username must have at least 4 letters!")
        if(!password) return res.status(400).json("Password must be inserted!")
        if(!verifyPassword.passwordValidator.isValid(password)) return res.status(400).json("Password must have minimum eight characters, at least one letter and one number!")
        if(!confirmpassword) return res.status(400).json("Password Confirmation must be inserted!")
        if(password !== confirmpassword) return res.status(400).json("Passwords must be equal!")
        acc_type = "User"

        let user: userInterface;
        
        user = {
            name_user,
            username,
            password,
            acc_type
        }

        const newUser = { ...user }
        newUser.password = getPasswordHash(user.password);

        const response : QueryResult = await pool.query(`INSERT INTO users (name_user, username, password, acc_type) VALUES ($1, $2, $3, $4)`, [newUser.name_user, newUser.username, newUser.password, newUser.acc_type]);
        
        return res.json({
            message: 'User Created Sucessfully', 
            body: {
                name_user, 
                username, 
                acc_type
            }
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error')
    }
}

export default { getUsers, getUserByID, getUserByIDAllowAuth, getUserByUsername, createUser };