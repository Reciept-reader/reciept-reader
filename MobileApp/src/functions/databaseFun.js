
import { createClient } from "@supabase/supabase-js";
import { SUPA_ANON, SUPA_URL } from "@env"

/*
Database layer to interact with the js client and edge functions 
*/


//CONSTANTS
const RECEIPT_URL = 'https://ixxtmhjztlfsfjorurfi.functions.supabase.co/reciept'
const CUSTOM_URL = 'https://ixxtmhjztlfsfjorurfi.functions.supabase.co/custom'
const POST_OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPA_ANON}`,
    },
    body: undefined,
}


/*
Create client 
Creates a supabase.js client to interact with the database
*/
export async function createSupaClient() {
    try {
        const supabase = createClient(SUPA_URL, SUPA_ANON);
        return supabase
    } catch (error) {
        console.error(error)
        return "Cannot connect to client"
    }
}

/*
Receipt edge
Coming from the userData functions any receipt manipulation comes through here 
to interact with the receipt edge function 
*/
export async function receiptEdge(receiptData) {
    let receipt_options = POST_OPTIONS
    receipt_options.body = JSON.stringify(receiptData)
    const res = await fetchData(RECEIPT_URL, receipt_options)
    return res
}

/*
custom edge
Coming from the userData functions any custom item manipulation comes through here 
to interact with the custom edge function 
*/
export async function customEdge(itemData) {
    let custom_options = POST_OPTIONS
    custom_options.body = JSON.stringify(itemData)
    const res = await fetchData(RECEIPT_URL, custom_options)
    return res
}

/*
Fetch data
Used to get or post to the db
*/
async function fetchData(url, data) {
    const res = await fetch(url, data)
    return res
}


export default { createSupaClient , receiptEdge , customEdge }