import { createSupaClient } from './databaseFun.js'

/* Date Grabber
Takes in a userID, Start Date, and End Date and retrieves every receipt between 
both dates (inclusive) that belongs to the user with the corresponding userID.
Then adds the totals for each receipt together to get the total amount spent 
from the Start Date to the End Date.
*/
export async function dateGrabber(userId, startDate, endDate) {
    const supabase = await createSupaClient()
    
    const {data, error} = await supabase
        .from('receipt')
        .select('total')
        .eq("user_id", userId)
        .gte('date', startDate)
        .lte('date', endDate);
        

        if (error) throw error;
        
        //Function will return -1 if no receipts are found
        if (data[0] == undefined) return -1;
        
        /*
          Variables to hold the length of the array of receipts, 
          the sum, and an int for the while loop
        */
        const length = data.length;
        let sum = 0;
        let i = 0;
        
        //While loop for adding the sum 
        //Inside of a try catch in the event that the receipts are invalid
        try {
          while (i < length) {
            if (isNaN(data[i].total) == true) {
              sum += 0;
            } else {
              sum += data[i].total;
            }
            i++;
          }
        } catch (error) {
          alert(`Something is wrong with one of your receipts.`);
        }
        
        //Returns the sum of the receipt totals (or 0 if something was wrong with the receipts)
        return sum;
}
export default { dateGrabber };
