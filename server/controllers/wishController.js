import { Wish, User, Pack, Image } from "../models/index.js"

async function createWish({body}, res) {
    /**
     * Wishes are tied to packs
     * req.body = {
     *  userId (ObjectId) (required),
     *  packId (ObjectId) (required),
     *  [links] ([string]) (optional),
     *  comments (string) (optional)
     * }
     */
    try {
        const wishData = await Wish.create(body);
        if (!wishData) {
            throw new Error("Could not create wish")
        }
        const packData = await Pack.findOneAndUpdate(
            {_id: body.packId},
            {$addToSet: wishData._id},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not add wish to Pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: body.userId},
            { $addToSet: { wishes: wishData._id}},
            {
                runValidators: true,
                new: true,
            }
        )
        .populate('wishes', 'wishName packId')
        .populate({
            path: "wishes.packId",
            model: "Pack"
        })
        if (!userData) {
            throw new Error("Could not add wish to user")
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteWish({body},res) {
    /**
     * 
     */
    try {
        const {wishId, userId, packId} = body
        const wishData = await Wish.findOneAndDelete({
            _id: wishId
        })
        if (!wishData) {
            throw new Error("Could not delete wish")
        }
        const userData = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: wishId},
            {new: true}
        )
        if (!userData) {
            throw new Error("Could not remove wish from user")
        }
        const packData = await Pack.findOneAndUpdate(
            {_id: packId},
            {$pull: {wishes: wishId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not remove wish from pack")
        }
        await Image.deleteMany(
            {_id: {$in: wishData.images}}
        )
        res.status(200).json("Wish Deleted!")
    } catch (err) {
        res.status(400).json(err)
    }
}

async function updateWish(req, res) {
    /**
     * 
     */
    try {
        const wishData = await Wish.findOneAndUpdate(
            {_id: req.params._id},
            {...req.body},
            {
                runValidators: true,
                new: true
            }
        )
        if (!wishData) {
            throw new Error("Could not update Wish")
        }
        res.status(200).json(wishData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getAllWishes(req,res) {
    try {
        const wishData = await Wish.find()
        .populate("images")
        .populate("packId", "packName")
        if (!wishData) {
            throw new Error("Could not get all Wishes")
        }
        res.status(200).json(wishData)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function getWishById({body},res) {
    try {
        const wishData = await Wish.findOne(
            {_id: body._id}
        ).populate("images", "fileId")
        if (!wishData) {
            throw new Error("Could not get all Wishes")
        }
        res.status(200).json(wishData)
    } catch (err) {
        res.status(400).json(err)
    }
}

export {
    createWish,
    deleteWish,
    updateWish,
    getAllWishes,
    getWishById,
}