import { NextFunction, Request, Response } from "express";
import { LoginType, UserType } from "../schemes/user.schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addToDb, getUser, getUsers } from "../db/user.db";

const JWT_KEY = "EINGANZGEHEIMERZUFAELLIGERSCHLUESSEL";

export async function register(req: Request, res: Response) {
    const newUser: UserType = req.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    addToDb(req.body);
    res.sendStatus(200);
}

export function logout(req: Request, res: Response) {
    res.clearCookie("email");
    res.sendStatus(200);
}

export async function login(req: Request, res: Response) {
    let loginData: UserType = req.body;
    let user = getUser(loginData);
    if (await user) {
        res.send({
            accessToken: generateAccessToken(loginData.email)
        });
    } else {
        res.sendStatus(401);
    }
}

type token = { email: string; };

function generateAccessToken(email: string) {
    return jwt.sign({ email: email }, JWT_KEY, { expiresIn: "10 minutes" });
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    if (req.path in ["/user/login", "/user"]) return next(); // no need for token when login

    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(403);
    jwt.verify(token, JWT_KEY, async (err, content) => {
        if (err) return res.sendStatus(403);
        res.locals.user = (await getUsers()).find(u => u.email == (<token>content).email);
        next();
    });
}
