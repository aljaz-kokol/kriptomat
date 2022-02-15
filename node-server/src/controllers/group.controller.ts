import { Request, Response, NextFunction } from 'express';
import {GroupService} from "../services/group.service";
import {StatusCode} from "../utils/status.util";
import Group from "../models/group.model";

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

export const putUpdateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupToUpdate = await GroupService.get.groupById(req.params.id);
        const name = req.body.name ?? groupToUpdate.name;
        const note = req.body.note ?? groupToUpdate.note;
        const coins = req.body.coins ?? groupToUpdate.coins;

        const group = await GroupService.get.updateGroup(groupToUpdate, name.trim().toLowerCase(), coins, note);
        res.status(StatusCode.OK).json({
            message: 'Successfully updated group',
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
