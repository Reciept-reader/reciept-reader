import { createSupaClient } from './databaseFun.js'


export async function dateGrabber(userId, startDate, endDate) {
    const supabase = await createSupaClient()
    
    const {data, error} = await supabase
        .from('receipt')
        .select('total')
        .eq("user_id", userId)
        .gte('date', startDate)
        .lte('date', endDate);
        

        if (error) throw error;

        if (data[0] == undefined) return -1;
        //alert(`${data[1].total}`);
        const length = data.length;
        let sum = 0;
        let i = 0;
        
        try {
          while (i < length) {
            sum += data[i].total;
            i++;
          }
        } catch (error) {
          alert(`Something is wrong with one of your receipts.`);
        }
        return sum;
}
export default { dateGrab };
