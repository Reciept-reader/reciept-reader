import analyze_receipt from './analyze-receipt.js';
import preprocess from './image-preprocessing.js';
import createReceipt from './item_extraction.js';

//allows use of require
import { createRequire } from 'module'
const require = createRequire(import.meta.url)

import express from 'express'
const fs = require('fs');
var bodyParser = require('body-parser')

//Express.js shtuff
const app = express();
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
const port = 3000;

let imagePath = "";

async function main() {
    let image = await preprocess(imagePath);
    console.log("preprocessed")
    let arr = await analyze_receipt(image);
    console.log("raw data retrieved: ");
    console.log(arr);

    let receipt = await createReceipt(arr);
    console.log(receipt);

    return receipt;
}

//post method to pass image
app.post('/', (req, res) => {
    
    //let id = req.body.id;
    //console.log(req.body.url);
    imagePath = req.body.url;

    //Run OCR
    const test = async () => {

        const result = await main()
        // send arr back
        res.end(JSON.stringify(result));
      }
    
    test();
    
});

app.listen(port, () => console.log('Awaiting post with image url...'));