import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';


/*
Creates pool with env variables to access the database 
*/
async function createPool() {
    dotenv.config();
    const pool = new Pool({
        user: process.env.SUPA_USER,
        password: process.env.SUPA_PASSWORD,
        host: process.env.SUPA_HOST,
        database: process.env.SUPA_DATABASE,
        port: process.env.SUPA_PORT
    })
    return pool
}

/*
Database function
USPERTS (INSERT or UPDATES) the database to store or update a user's alias name for an item
*/
export async function upsertItem(item_name, alias) {
    const pool = await createPool()
    const res = await pool.query(
        `INSERT INTO item_alias (item_name, alias)
        VALUES ($1, $2)
        ON CONFLICT (item_name) DO UPDATE SET
        item_name = excluded.item_name , alias = excluded.alias`,
        [item_name, alias]
    );
}


/*
Database function 
Pulls all rows from item_alias and returns them in a map of item_name -> alias
*/
export async function getItems() {
    const pool = await createPool()
    const res = await pool.query(
        `SELECT * FROM item_alias`
    );
    const itemNameToAlias = new Map()
    res.rows.forEach((row) => itemNameToAlias.set(row.item_name, row.alias))
    return itemNameToAlias
}

export default { getItems , upsertItem }