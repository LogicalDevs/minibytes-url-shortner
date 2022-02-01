import { Request, Response } from 'express';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import userController from '../controllers/users.controller';
import * as bcrypt from 'bcrypt';


export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const user = await userController.getUserByUsername(req, res);

    if (!user) return res.status(404).json('User not found');
    if (!(await bcrypt.compare(password.toString(), user.password))) return res.status(404).json('User not found')

    const token = jwt.sign({ id: user.id_user }, config.authToken, {
        expiresIn: '3d'
    })

    const data = {
        id_user: user.id_user,
        name_user: user.name_user,
        username: user.username,
        token
    }

    return res.json(data)
}

export default { login };
