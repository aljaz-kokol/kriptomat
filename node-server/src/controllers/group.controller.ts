import { Request, Response, NextFunction } from 'express';
import {GroupService} from "../services/group.service";
import {StatusCode} from "../utils/status.util";

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await GroupService.get.groupList();
        res.status(StatusCode.OK).json(groups);
    } catch (err) {
        next(err);
    }
}

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await GroupService.get.groupById(req.params.id);
        res.status(StatusCode.OK).json(group);
    } catch (err) {
        next(err);
    }
}

export const postCreateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await GroupService.get.createGroup(req.body.name, req.body.coins, req.body.note ?? '');
        res.status(StatusCode.OK).json({
            message: 'Group successfully created',
            group: group
        });
    } catch (err) {
        next(err);
    }
}

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await GroupService.get.deleteGroup(req.params.id);
        res.status(StatusCode.NO_CONTENT).json({});
    } catch (err) {
        next(err);
    }
}
