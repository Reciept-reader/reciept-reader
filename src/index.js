/**********************************************************
 * To run, type in terminal: 
 *                           npm i
 *                           node index.js
 *********************************************************/
import analyze_receipt from './analyze-receipt.js';
import preprocess from './image-preprocessing.js';
import createReceipt from './item_extraction.js';


const  defaultImagePath = "/Users/jacobfisher/Desktop/homework/CS481/group-git/reciept-reader/receipts/costco1.JPG";
async function main() {
    let imagePath = await preprocess(defaultImagePath);
    console.log("preprocessed")
    let arr = await analyze_receipt(imagePath);
    console.log("analyzed")
    let receipt = await createReceipt(arr);
    console.log(receipt);

}


main()
