import { Image, Wish } from '../models/index.js';

async function addImage(req, res) {
  try {
    const imageData = await Image.create(req.body);
    if (!imageData) {
      throw new Error('Could not add image');
    }
    const wishData = await Wish.findOneAndUpdate(
      { _id: req.params._id },
      { $addToSet: { images: imageData._id } },
      {
        runValidators: true,
        new: true,
      },
    ).populate('images');
    res.status(200).json(wishData);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function removeImage({body}, res) {
  try {
    const {imageId, wishId} = body
    const imageData = await Image.findOneAndDelete({ _id: imageId });
    if (!imageData) {
        throw new Error("Could not delete image")
    }
    const wishData = await Wish.findOneAndUpdate(
      { _id: wishId },
      { $pull: { images: imageId } },
      {
        new: true,
      },
    ).populate("images");
    if (!wishData) {
        throw new Error("Could not remove image from wish")
    }
    res.status(200).json(wishData)
  } catch (err) {
    res.status(400).json(err);
  }
}

export {
    addImage,
    removeImage,
}
