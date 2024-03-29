import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,

} from '../controller/user.js'

import verifyjwt from "../middleware/verifyjwt.js";

const router= express.Router()

// Read from the db the frontend will send the id as a param
router.get('/:id', verifyjwt, getUser)
router.get('/:id/friends', verifyjwt, getUserFriends)

//update

router.patch('/:id/:friendId',addRemoveFriend)


export  default router
