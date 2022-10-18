import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userMap } from "../stores/UserStore";
import { UserType } from "../schemes/userSchemes";


export function signUp(req: Request, res: Response) {
    const user: UserType = req.body;

    if (userMap.get(user.username)) {
        res.status(400).send("User already exists");
    } else {
        userMap.set(user.username, bcrypt.hashSync(user.password, 10));
    }
}

export function login(req: Request, res: Response) {
    let hash: string = userMap.get(req.query.username?.toString() || '') || '';
    let password: string = req.query.password?.toString() || '';

    console.log(req.query);


    if (password && bcrypt.compareSync(password, hash)) {
        res.status(200).send('login successful');
    } else {
        res.status(401).send('login failed');
    }
}
