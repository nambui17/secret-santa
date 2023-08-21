import { User, Pack, Assignment, Wish, Image} from '../models/index.js';

async function createPack(req,res) {
    try {
        const packData = Pack.create(req.body)
        if (!packData) {
            throw new Error("Could not create new pack")
        }
        const userData = User.findOneAndUpdate(
            {_id: req.params.userId},
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
        const packData = Pack.findOneAndDelete(
            {_id: packId}
        )
        if (!packData) {
            throw new Error("Could not delete pack")
        }
        for (i=0; i<packData.members.length-1; i++) {
            await User.findOneAndUpdate(
                {_id: packData.members[i]},
                {$pull: {packs: packId}},
                {new: true}
            )
        }
        await Assignment.deleteMany(
            {_id: {$in: packData.assignments}}
        )
        for (i=0; i<packData.wishes.length-1; i++) {
            const wishData = await Wish.findOneAndDelete(
                {_id: packData.wishes[i]}
            )
            await Image.deleteMany(
                {_id: {$in: wishData.images}}
            )
        }
        res.status(200).json("Pack was deleted")
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addUserPack({body},res) {
    try {
        const {userId, packId} = body
        const packData = Pack.findOneAndUpdate(
            {_id: packId},
            {$addToSet: { members: userId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not add user to pack")
        }
        const userData = User.findOneAndUpdate(
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
        const packData = Pack.findOneAndUpdate(
            {_id: packId},
            {$pull: {members: userId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not remove user from pack")
        }
        const userData = User.findOneAndUpdate(
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

export {
    createPack,
    deletePack,
    addUserPack,
    removeUserPack
}
