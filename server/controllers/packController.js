import { User, Pack, Assignment, Wish, Image} from '../models/index.js';
import mongoose from 'mongoose'

async function createPack(req,res) {
    try {
        const packData = await Pack.create(req.body)
        if (!packData) {
            throw new Error("Could not create new pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: req.body.admin},
            { $addToSet: { packs: packData._id}},
            { new: true}
        ).populate("packs")
        if (!userData) {
            throw new Error("Could not add pack to user")
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deletePack({body},res) {
    try {
        const {packId} = body
        const packData = await Pack.findOneAndDelete(
            {_id: packId}
        )
        if (!packData) {
            throw new Error("Could not delete pack")
        }
        await User.updateMany(
            {_id: {$in: packData.members}},
            {$pull: {packs: packData._id}},
            {new: true}
        )
        if (packData.assignments.length > 0) {
            await Assignment.deleteMany(
                {_id: {$in: packData.assignments}}
            )
        }
        if (packData.wishes.length > 0) {
            for (i=0; i < packData.wishes.length ; i++) {
                const wishData = await Wish.findOneAndDelete(
                    {_id: packData.wishes[i]}
                )
                if (wishData.images.length>0) {
                    await Image.deleteMany(
                        {_id: {$in: wishData.images}}
                    )
                }
            }
        }
        res.status(200).json("Pack was deleted")
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addUserPack({body},res) {
    try {
        const {userId, packId} = body
        const packData = await Pack.findOneAndUpdate(
            {_id: packId},
            {$addToSet: { members: userId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not add user to pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: userId},
            {$addToSet: { packs: packId}},
            { new: true}
        )
        if (!userData) {
            throw new Error("Could not add pack to user")
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function removeUserPack({body},res) {
    try {
        const {userId, packId} = body
        const packData = await Pack.findOneAndUpdate(
            {_id: packId},
            {$pull: {members: userId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not remove user from pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {packs: packId}},
            {new: true}
        )
        if (!userData) {
            throw new Error("Could not remove pack from user")
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPacks(req,res) {
    try {
        const packData = await Pack.find()
        if (!packData) {
            throw new Error("Could not get packs")
        }
        res.status(200).json(packData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getPackById({body},res) {
    try {
        const packData = await Pack.findById(body._id)
            .populate("assignments", "gifter receiver")
            .populate("wishes", "images wishName")
            .populate("members", "firstName lastName email")
        if (!packData) {
            throw new Error("Could not find pack")
        }
        res.status(200).json(packData)
    } catch (err) {
        res.status(400).json(err)
    }
}

export {
    createPack,
    deletePack,
    addUserPack,
    removeUserPack,
    getPacks,
    getPackById
}
