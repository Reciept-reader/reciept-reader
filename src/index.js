/**********************************************************
 * To run, type in terminal: 
 *                           npm i
 *                           node index.js
 *********************************************************/
import analyze_receipt from './analyze-receipt.js';
import preprocess from './image-preprocessing.js';

let defaultImagePath = "receipts/receipt2.jpeg";

let imagePath = await preprocess(defaultImagePath);
let arr = await analyze_receipt(imagePath);

console.log(arr);