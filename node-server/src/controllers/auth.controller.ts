import {Request, Response, NextFunction} from "express";

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {

}

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (err) {
        next(err);
    }
}
