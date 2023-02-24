import { createSupaClient } from './databaseFun.js'

/*
Helper Functions for inserting , updating , and deleting receipts 
Helper Functions for inserting , updating , and deleting user custom items  
*/



/*
Data creation for making templates for the data
*/
export function createReceiptData({userId, storeName, total, date, items}) {
    const receipt = {
        "user_id": userId || undefined, 
        "store_name": storeName || undefined,
        "total": total || undefined,
        "date": date || undefined,
        "items": items || undefined
    }
    return receipt
}

export function createItemData({itemName, customName, price}) {
    const item = {
        "item_name": itemName || undefined, 
        "custom_name": customName || undefined,
        "price": price || undefined,
    }
    return item
}

export function createCustomItemData({command, userId, itemName, customName}) {
    const customItem = {
        "command": command || undefined,
        "user_id": userId || undefined,
        "item_name": itemName || undefined,
        "custom_name": customName || undefined,
    }
    return customItem
}


//RECEIPTS
//******************************
/*
Insert Receipt 
Takes in receipt data and items and posts them to the db 
uses edge function to manage receipt addition and items at the same time
*/
async function insertReceipt(receiptData, itemsData) {
    let receipt = receiptData.items = itemsData
    const res = await receiptEdge(receipt)
    return res
}

/*
Delete Receipt 
Takes in receipt data and deletes the receipt and items from the db
uses edge functon to manage deleting at the same time
*/
async function deleteReceipt(receiptData) {
    

}


/*
Edit Receipt 
Takes in receipt data and updates it seperate to items update / edit  
*/
async function editReceipt(userId, receiptData, itemsData) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('receipt')
        .delete()
}


/*
get receipt 
Takes in a user_id and receipt _id 
If a match is found return that receipt object and items
*/
const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('receipt')
        .select('receipt_id, store_name, price, date')
        .eq('user_id', userId)
        .eq('receipt_id', receiptId)
        .eq('item_id', itemId);

/*
get all receipts 
Takes in a user_id and returns all receipts associated with that account 
*/


//ITEMS
//******************************

/*
Insert item(s)
Inserts item(s) on receipt_id and user_id
items are in a list from one object to unlimited
*/
async function insertItem(items) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('item')
        .insert(items)

    if (error) throw error;
    return data   
}

/*
edit item(s)
takes in a user_id , receipt_id , and item_id
updates every items(s) at that item_id with the new data
items are in a list from one object up to all that exist on a receipt
*/
async function editItemsReceipt(items) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('item')
        .upsert(items, {onConflict: "user_id, receipt_id, item_id"})

    if (error) throw error;
    return data  
}

/*
get item 
Takes in an item_id , user_id , and receipt_id 
Returns the item at that id and receipt
*/
async function getItem(userId, receiptId, itemId) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('item')
        .select('item_name, price, custom_name')
        .eq('user_id', userId)
        .eq('receipt_id', receiptId)
        .eq('item_id', itemId);
    if (error) throw error;
    return data
}

/*
get all item(s)
Takes in a user_id and receipt_id
Returns all the items associated with this receipt
*/
async function getItemsReceipt(userId, receiptId) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('item')
        .select('item_name, price, custom_name')
        .eq('user_id', userId)
        .eq('receipt_id', receiptId)
    if (error) throw error;
    return data
}

/*
delete item(s)
Takes in a user_id , receipt_id , and item_id
items are in a list from one object up to all that exist on a receipt
*/
async function deleteItemsReceipt(items) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from('item')
        .delete()
        .in(items)
}


//CUSTOM NAMES
//******************************
/*
Delete custom 
Takes in an item name and deletes the custom name associated with that item
Will also delete all previous occurances of that custom name for the item name in items
*/
async function deleteCustomItem(userId, itemName) {
    let customItem = createCustomItemData({command: 'delete', userId: userId, itemName: itemName})
    let res = await customEdge(customItem)
    return res
}


/*
Delete all custom on all items 
Takes in an custom name and deletes the custom name for all items associated
with that name also delete all previous occurances of that custom name for every item name in items
*/
async function deleteCustomAll(userId, customName) {
    let customItem = createCustomItemData({command: 'delete_all', userId: userId, customName: customName})
    let res = await customEdge(customItem)
    return res
}

/*
upsert custom 
Takes in an item name and custom name and inserts or updates that items custom name to the new one
Will also insert or update all previous occurances of that item name to be the new custom item name in items
*/
async function upsertCustomItem(userId, itemName, customName) {
    let customItem = createCustomItemData({command: 'upsert', userId: userId, itemName: itemName, customName: customName})
    let res = await customEdge(customItem)
    return res
}


/*
upsert custom on all items
Takes in a custom name and updates that custom name to the new one
across all items that have that custom name
also update all previous occurances of that custom name to be the new custom name in items
*/
async function upsertCustomAll(userId, customName) {
    let customItem = createCustomItemData({command: 'upsert_all', userId: userId, customName: customName})
    let res = await customEdge(customItem)
    return res
}


/*
get custom item
takes in user_id and item_name 
returns the item_name to custom_name relationships
*/
async function getCustomItem(userId, itemName) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from("item_custom_name")
        .select("item_name, custom_name")
        .eq("user_id", userId)
        .eq("item_name", itemName)
    if (error) throw error
    return data
        .
}


/*
get custom all 
takes in user_id and custom_name 
returns all the item_name to custom_name relationsjhips for that custom_name
*/
async function getCustomAll(userId, customName) {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from("item_custom_name")
        .select("item_name, custom_name")
        .eq("user_id", userId)
        .eq("custom_name", customName)
    if (error) throw error
    return data
}


/*
get all user custom names
return every custom name and item the user has set
*/
async function getCustomItemsUser() {
    const supabase = await createSupaClient();
    const {data, error} = await supabase
        .from("item_custom_name")
        .select("item_name, custom_name")
        .eq("user_id", userId)
    if (error) throw error
    return data
}