import {Types} from "mongoose";
import Group, {GroupDocument} from "../models/group.model";
import {InvalidParameterError} from "../errors/invalid-par.error";
import {NotFoundError} from "../errors/not-found.error";
import {AlreadyExistsError} from "../errors/already-exists.error";
import {CoinService} from "./coin.service";

export class GroupService {
    private static _instance: GroupService;
    private constructor() {}

    public static get get(): GroupService {
        if (!this._instance)
            this._instance = new GroupService();
        return this._instance;
    }

    public async groupList(): Promise<GroupDocument[]> {
        return await Group.find().populate({
            path: 'coins'
        });
    }

    public async groupById(groupId: string): Promise<GroupDocument> {
        if (!Types.ObjectId.isValid(groupId))
            throw new InvalidParameterError(`The passed id ${groupId} is invalid`);
        const group = await Group.findById(groupId).populate({
            path: 'coins'
        });
        if (!group)
            throw new NotFoundError(`Group with id ${groupId} does not exist`);
        return group;
    }

    public async createGroup(name: string, coins: string[], note?: string): Promise<GroupDocument> {
        coins = Array.from(new Set(coins));
        const group = await Group.findOne({name: name.trim().toLowerCase()});
        if (group)
            throw new AlreadyExistsError(`Group with name ${name} already exists`);
        if (name.trim().length <= 0)
            throw new InvalidParameterError('Name of the group was not provided');

        if (coins.length <= 0)
            throw new InvalidParameterError('Group cannot be empty');

        for (const coinId of coins) {
            const coin = await CoinService.get.coinById(coinId);
            if (!coin)
                throw new NotFoundError(`Coin with id ${coinId} could not be found`)
        }

        return await Group.create({
            name: name.trim().toLowerCase(),
            note: note,
            coins: coins
        }).then(group => group.populate('coins'));
    }

    public async deleteGroup(groupId: string): Promise<void> {
        const group = await this.groupById(groupId);
        if (group)
            await Group.findByIdAndDelete(groupId);
    }
}
