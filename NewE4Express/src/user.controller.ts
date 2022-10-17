import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userMap } from "./UserStore";


export function signUp(req: Request, res: Response) {
    let username = req.body['username'];
    let password = bcrypt.hashSync(req.body['password'], 10);

    userMap.set(username, password);
    res.send('user added');
}

export function login(req: Request, res: Response) {
    let password = userMap.get(req.query.username?.toString() || '');
    if (password = bcrypt.hashSync(req.query.password?.toString() || '', 10)) {
        res.send('login successful');
    }
    else {
        res.send('login failed');
    }
}
