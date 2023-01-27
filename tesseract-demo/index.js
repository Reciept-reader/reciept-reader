/**********************************************************
 * To run, type in terminal: node index.js
 *********************************************************/

import { createWorker } from 'tesseract.js';
import Jimp from 'jimp';

// A collection of images of receipts, found in the "receipts" folder 

let img1 = "receipts/receipt.jpg";
let img2 = "receipts/receipt2.jpeg";
let img3 = "receipts/receipt3.jpeg";
let img4 = "receipts/receipt4.jpeg";

// Creates a worker and logs the progress to the console. 
const worker = await createWorker();

(async () => {
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  /**********************************************************
  * This function creates a new image in the receipts folder
  * named "test.jpg" which has been manipulated in an attempt
  * to increase the clarity of the image and increase overall
  * confidence. The only parameter for this function is the 
  * original image, which will be manipulated.
  ***********************************************************/
  
  preprocessImage(img4);
  
  
  let test = "receipts/test.jpg"
  const { data: { lines } } = await worker.recognize(test);

  // If you would not like to preprocess the image, comment out the above
  // and uncomment the line below

  // const { data: { lines } } = await worker.recognize(img4);
  
  let totalConfidence = 0;
  
  for (let i = 0; i < lines.length; i++)
  {
    console.log("line: " + i + ". text: " + lines[i].text);
    totalConfidence += lines[i].confidence;
  }
  console.log("Avg confidence of document: " + totalConfidence / lines.length);
  await worker.terminate();
})();

async function preprocessImage(input)
{
  Jimp.read(input).then(image => {
    return image
      .greyscale()           // Removes color from image
      .contrast(1)           // Increases contract by maximum value (an attempt at binarization)
      .brightness(0.15)      // Increases brightness of image by 15%
      .write('receipts/test.jpg');
  }).catch(err => {
    if (err) throw err;
  });
}