// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2'


console.log("Hi Custom Names!")

serve(async (req) => {
  const data = await req.json();

  const supabase = await createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  switch (data.command) {
    case "delete":
      // Delete the row with the given item_name for the user
      // this allows multiple items to point towards the same name 
      // and still delete one 
      const { data: deletedData, error: deleteError } = await supabase
      .from('item_custom_name')
      .delete()
      .eq('user_id', data.user_id)
      .eq('item_name', data.item_name)

      if (deleteError) {
        console.error('Error deleting custom name:', deleteError.message);
        return new Response(JSON.stringify({message: deleteError.message}));
      }
      break;


    // delete_all, the user can delete all items that point 
    // towards a single custom name effectively allowing the user 
    // to completely rid of any custom name by deleting all occurances of it
    case "delete_all":
      const { data: deleteAllData, error: deleteAllError } = await supabase.from('item_custom_name')
      .from('item_custom_name')
      .delete()
      .eq('user_id', data.user_id)
      .eq('custom_name', data.custom_name);

      if (deleteAllError) {
        console.error('Error deleting custom name:', deleteAllError.message);
        return new Response(JSON.stringify({message: deleteAllError.message}));
      }
      break;


    case "insert":
      // Upsert custom name for the given user and item name
      // On conflict of item_name update the custom_name it points to 
      const { data: insertResult, error: insertError } = await supabase
        .from('item_custom_name')
        .insert({ 
          user_id: data.user_id,
          item_name: data.item_name,
          custom_name: data.custom_name 
          });

      if (insertError) {
        console.error('Error upserting custom name:', insertError.message);
        return new Response(JSON.stringify({ message: insertError.message }));
      }
      break;


    case "upsert":
      const { updateData, updateError } = await supabase
      .from('item_custom_name')
      .upsert({ 
        user_id: data.user_id,
        item_name: data.item_name,
        custom_name: data.custom_name
      }, { onConflict: 'user_id, item_name'}
      );

      if (updateError) {
        console.error('Error upserting custom name:', updateError.message);
        return new Response(JSON.stringify({ message: updateError.message }));
      }
  
      break;



    default:
      console.error(`Unknown command: ${command}`);
      return new Response(JSON.stringify({ message: `Unknown command: ${data.command}` }));
  }
  //return on success 
  return new Response(JSON.stringify({ message: `${data.command} Success`}));
})
