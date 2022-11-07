import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { LoginType, UserType } from "../schemes/userSchemes";
import { userStore } from "../stores/UserStore";
import jwt from 'jsonwebtoken';


export async function signUp(req: Request<{}, {}, UserType>, res: Response) {
    if (userStore.some(u => req.body.email == u.email)) {
        res.status(400).send("duplicate email already registered");
    } else {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        userStore.push(req.body);
        res.send(jwt.sign({ email: req.body.email }, 'I am a very really great and secret secret that nobody knows', { expiresIn: '30m' }));
    }
}


export function logout(_: Request, res: Response) {
    res.send(404);
}


export async function login(req: Request, res: Response) {
    const loginForm: LoginType = req.body; // Alternative Typsicherheit
    const user = userStore.find(u => u.email == loginForm.email);
    if (user && await bcrypt.compare(loginForm.password, user.password)) {
        res.status(200).send("OK");
    }
    else {
        res.status(401).send("Wrong credentials");
    }
}

export function getCurrentUser(req: Request, res: Response) {
    if (!req.signedCookies.email) {
        res.sendStatus(400);
        return;
    }
    let { password, ...user } = userStore.find(u => u.email == req.signedCookies.email)!;
    res.send(user);
}
