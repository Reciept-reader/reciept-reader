import levenshtein from 'fast-levenshtein';

const dict = ["Walmart", "Safeway", "FredMeyer", "GroceryOutlet"]

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


//Selects which regex to use depending on the store name
async function selectRegex(store) {
    // extracts a 10-11 digit number and the proceeding text within the line
    const fredMeyerRegex = /\b\d{9,11}\b\s*(.+?)(?=\b\d{9,11}\b|$)/gm
    // extracts text preceeding a capital letter seperated by whitespace up to the '[' character
    const hasCapitalLetter = /([^[)]+)\s+(\$)?(\d+\.\d{2})\s+[A-Z]\b/g
    //can use either fredMeyerRegex or hasCapitalLetter
    const combinedRegex = new RegExp(fredMeyerRegex.source+ '|' + hasCapitalLetter.source);
    // extracts text if there is a double present in the line
    const simple = /([^[)]+)\s+(\$)?(\d+\.\d{2})/gi


    if(store == "FredMeyer"){
        return fredMeyerRegex
    }
    else if(store == "Safeway" || store == "GroceryOutlet"){
        return hasCapitalLetter
    }
    else if (store == "Super1Foods"){
        //todo
    }
    else{
        return simple
    }
}

//Extracts items differently depending on the receipt
async function extractItems(match, store){
    // extracts a double 
    const extractDouble = /\d+\.\d+/g
    //extracts text preceeding a '$' or a '.'
    const sfExtractName = /.*(?=\$|\.)/g
    //extracts non digit text following a 10-11 digit number
    const fmExtractName = /(?<=\b\d{9,11}\b)\b.+\b/
    //  characters that are not digits, dots, or dollar signs. 
    const simple = /[^0-9.$]+/g
    //extracts a standalone character
    const standaloneChar = /\b\w\b/gm

    let price = " "
    let correspondingItem = ""
    let retunrArr = [correspondingItem, price]
    const item_name = match[0]
    const priceExtract = item_name.match(extractDouble)
    let nameExtract = item_name.match(sfExtractName)
    if(store == "FredMeyer"){
        nameExtract = item_name.match(fmExtractName)
        if (nameExtract && nameExtract[0]) {
            correspondingItem = nameExtract[0].replace(extractDouble, '');
            correspondingItem = correspondingItem.replace(standaloneChar, '');
            correspondingItem = correspondingItem.trimStart()
           
          }
          if (priceExtract && priceExtract[0]) {
            price = parseFloat(priceExtract[0].trim())
            // Do something with correspondingItem
          }
        
        retunrArr = [correspondingItem, price]
        return retunrArr
    }
    else if(store == "Safeway" || store == "GroceryOutlet" || store == "Walmart"){
        nameExtract = item_name.match(sfExtractName)

        correspondingItem = nameExtract[0]
        correspondingItem = correspondingItem.replace(standaloneChar, '');
        correspondingItem = correspondingItem.trimStart()
        correspondingItem = correspondingItem.trimEnd()
        price = parseFloat(priceExtract[0])

        retunrArr = [correspondingItem, price]
        return retunrArr
    }
    else if(store == "Super1Foods")
    {
        nameExtract = item_name.match(simple)

        correspondingItem = nameExtract[0]
        price = parseFloat(priceExtract[0])

        retunrArr = [correspondingItem, price]
        return retunrArr
        //todo
    }
    //if store is unrecognzed
    else{
        nameExtract = item_name.match(simple)

        correspondingItem = nameExtract[0]
        price = parseFloat(priceExtract[0])

        retunrArr = [correspondingItem, price]
        return retunrArr
    }
    
    
    
    
}

/*
Runs lines through the regular expressions if total found or data saves 
If item found checks for user alias
*/
async function extractData(lines) {
    //REGULAR EXPRESSIONS
    // extracts date in the format 02/02/2222
    const dateRegex = /\b\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}\b/g
    // extracts a double proceeding "balance", "total", "sum" etc... a '$' is optinoal
    const totalRegex = /(balance|total|grand\stotal|sum|bal|subtotal|balance:|total:|grand:\stotal:|sum:|bal:|subtotal:)\s+(\$)?(\d+([.,])?\d+)/gi
    // extracts a double 
    const extractDouble = /\d+\.\d+/g
    // extracts one of these store names
    const storeRegex = /(Safeway|Walmart|Costco|FredMeyer|GroceryOutlet|Target)/i

    const items = []
    let date = ""
    let total = ""
    let store = ""
    //call the db to access all user names for levenshtein
    //const itemNameToAlias = await getItems()
    //determine the store name
    for (const line of lines) {
        
        let words = String(line).split(/\s+/)
        
        for (let i = 0; i < words.length; i++) {
            const storeMatch = String( await levenshteinCorrection(words[i],dict)).match(storeRegex)
            if(storeMatch)
            {
                store = storeMatch[0]
                break
            }
        }
    }

    for (const line of lines) {
        
        const totalMatch = String(line).match(totalRegex)
        if (totalMatch) {
            const totalLine = totalMatch.toString()
            
            total = totalLine.match(extractDouble)
            total = parseFloat(total)
            
            continue
        }

        
        const itemMatch = String(line).match( await selectRegex(store))
        if (itemMatch) {
            const itemData = await extractItems(itemMatch, store)
            
            items.push({"item_name": itemData[0], "price": itemData[1]})
            //items.push({"name": await itemScan(itemData[0], itemNameToAlias), "price": itemData[1]})
            continue
        }
        

        const dateMatch = String(line).match(dateRegex)
        if (dateMatch) {
            date = dateMatch[0]
            continue
        }

    }

    return [items, date, total, store]
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
        'store': data[3] 
    }
    return receipt
}


export default createReceipt;