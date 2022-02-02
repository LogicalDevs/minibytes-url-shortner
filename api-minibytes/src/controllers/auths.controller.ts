import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userController from '../controllers/users.controller';
import * as bcrypt from 'bcrypt';


export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body;
    const user = await userController.getUserByUsername(req, res);

    if (!user) return res.status(404).json('User not found');
    if (!(await bcrypt.compare('' + password, user.password))) return res.status(404).json('User not found')

    const token = jwt.sign({ id: user.id_user }, process.env.AUTH_TOKEN!, {
        expiresIn: '3d'
    })

    return res.json({ token })
}

export default { login };
