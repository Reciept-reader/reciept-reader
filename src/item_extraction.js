
import { getItems } from './databaseFunctions/database.js'
import levenshtein from 'fast-levenshtein';

/*
Inputs a word and a list of words to match it to
Algorthim finds the closest matching word or exact if it is present
In the event of no close word or any similarity being below the threshold of accuarcy return the original word 
*/
async function levenshteinCorrection(text , dictionary) {
    const threshold = 0.5;
    // correct each word using Levenshtein distance
    let closestWord = text;
    let minDistance = Number.MAX_SAFE_INTEGER;
    dictionary.forEach(function(dictWord) {
        const distance = levenshtein.get(text, dictWord);
        if (distance < minDistance) {
        closestWord = dictWord;
        minDistance = distance;
        }
    });
    if (minDistance / text.length < threshold) {
        return closestWord;
    } else {
        return text;
    }
} 



/*
When an item matches a regular expression 
We check to see if that item has an alias user name 
Use lemming algo incase of poor OCR scan to grab the proper name
*/
async function itemScan(item_name, itemNameToAlias) {
    //item found check for alias
    item_name = await levenshteinCorrection(item_name , Array.from(itemNameToAlias.keys()))
    let userAlias = itemNameToAlias.get(item_name)
    // found a key name that matches or is close return value else we just return the item _name
    return (userAlias || item_name)
}



/*
Runs lines through the regular expressions if total found or data saves 
If item found checks for user alias
*/
async function extractData(lines) {
    //REGULAR EXPRESSIONS
    const itemRegex = /^\s*(\w+(?:\s+\w+)*)\s+\$(\d+\.\d{2})/
    const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})|(\d{2})\-(\d{2})\-(\d{4})/
    const totalRegex = /^\s*(total)\s+\$(\d+\.\d{2})/i
    const subTotalRegex = /^\s*(SUBTOTAL)\s+\$(\d+\.\d{2})/i

    const items = []
    let date = ""
    let total = ""

    //call the db to access all user names for levenshtein
    const itemNameToAlias = await getItems()

    for (const line of lines) {

        const totalMatch = line.match(subTotalRegex)
        if (totalMatch) {
            const [, name, priceStr] = totalMatch
            const price = parseFloat(priceStr)
            total = totalMatch.toString()
            continue
        }
        
        const itemMatch = line.match(itemRegex)
        if (itemMatch) {
            const [, name, priceStr] = itemMatch
            const price = parseFloat(priceStr)
            items.push({ "name": await itemScan(name, itemNameToAlias), "price": price })
            continue
        }

        const dateMatch = line.match(dateRegex)
        if (dateMatch) {
            date = dateMatch[0]
            continue
        }
    }

    return [items, date, total]
}



/*
Takes the lines from the OCR scan and turns them into an item of Receipt 
*/
async function createReceipt(lines) {
    //lines to strings
    let data = await extractData(lines)
    var receipt = {
        'items': data[0],
        'total': data[2],
        'date': data[1],
        'store': 'Grocery Outlet' //need to user store regular expression
    }
    return receipt
}


export default createReceipt