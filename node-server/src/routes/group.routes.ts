import { Router } from 'express';
import {deleteGroup, getGroupById, getGroups, postCreateGroup, putUpdateGroup} from "../controllers/group.controller";

const router = Router();

router.get('/', getGroups); // Return list of all groups
router.post('/', postCreateGroup); // Create new group
router.get('/:id', getGroupById); // Return group based on the passed id
router.put('/:id', putUpdateGroup); // Update group
router.delete('/:id', deleteGroup); // Delete group with the passed id

export default router;
