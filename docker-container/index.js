import analyze_receipt from "./analyze-receipt.js";
import createReceipt from "./item_extraction.js";

//allows use of require (for body-parser)
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import express from "express";
import fetch from "node-fetch";
import { promises as fs } from "fs";
var bodyParser = require("body-parser");

//Express.js shtuff
const app = express();
app.use(bodyParser.json());
const port = 3000;

let imageUrl = "";
const imagePath = "./processedReceipt.jpg";

//Turns an image link into a jpg for the program to preprocess
const downloadImageFromURL = async (url, path) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const arrBuff = await blob.arrayBuffer();
  const buff = Buffer.from(arrBuff);
  await fs.writeFile(path, buff);
};

// Runs the container code
async function main() {
  //Gets raw tesseract data from the receipt
  let arr = await analyze_receipt(imageUrl);
  console.log("raw data retrieved: ");
  console.log(arr);

  //Formats raw data into a format the app is expecting
  let receipt = await createReceipt(arr);
  console.log("Formated data: ");
  console.log(receipt);

  return receipt;
}

//post method to pass image
/* Expected Format:
        method: 'POST',
        body: JSON.stringify( { "url": "<img-url.here>" } ),
        headers: { 'Content-Type': 'application/json' }
*/
app.post("/", (req, res) => {
  console.log("Recieved image url");
  imageUrl = req.body.url;

  //Run OCR
  const test = async () => {
    //create processedReceipt.jpg
    await downloadImageFromURL(imageUrl, imagePath);
    const result = await main();
    // send receipt obj back
    res.end(JSON.stringify(result));
    console.log("Now ready for another url to process!");
    imageUrl = "";
  };
  test();
});

app.listen(port, () => console.log("Awaiting post with image url..."));