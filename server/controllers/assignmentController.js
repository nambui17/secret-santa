import { Pack, Assignment, User } from '../models/index.js'

async function addAssignment(req,res) {
    try {
        const assignmentData = await Assignment.create(req.body);
        if (!assignmentData) {
            throw new Error("Could not assign users")
        }
        const packData = await Pack.findOneAndUpdate(
            {_id: assignmentData.packId},
            {$addToSet: {assignments: assignmentData._id}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not add assignment to pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {assignments: assignmentData._id }},
            { new: true}
        ).populate("assignments")
        if (!userData) {
            throw new Error("Could not add assignment to user")
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(200).json(err)
    }
}

async function removeAssignment({body},res) {
    try {
        const { assignmentId, userId } = body
        const assignmentData = await Assignment.findOneAndDelete(
            {_id: assignmentId}
        )
        if (!assignmentData) {
            throw new Error("Could not delete assignment")
        }
        const packData = await Pack.findOneAndUpdate(
            {_id: assignmentData.packId},
            {$pull: {assignments: assignmentId}},
            {new: true}
        )
        if (!packData) {
            throw new Error("Could not remove assignment from pack")
        }
        const userData = await User.findOneAndUpdate(
            {_id: userId},
            {$pull: {assignments: assignmentId}},
            {new: true}
        ).populate("assignments")
        if (!userData) {
            throw new Error("Could not remove assignment from user")
        }
        res.status(200).json(userData)
    } catch (err) {
        res.status(200).json(err)
    }
}

export {
    addAssignment,
    removeAssignment
}