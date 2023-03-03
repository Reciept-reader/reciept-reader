import Jimp from 'jimp';

// Location of the preprocessed image
const preprocessedImage = "./processedReceipt.jpg";
async function preprocess(input)
{
  Jimp.read(input).then(image => {
    console.log("height: " + image.bitmap.height)
    console.log("width: " + image.bitmap.width)

    return image
      .resize(image.bitmap.width-1, image.bitmap.height-1, Jimp.RESIZE_BEZIER) //Secret image size decrease to prevent rotations of images
      .write(preprocessedImage); // Writes to preprocessed image location
  }).catch(err => {
    if (err) throw err;
  });
  return preprocessedImage;      // Returns the image location to be used in "analyze_receipt.js"
}

export default preprocess;