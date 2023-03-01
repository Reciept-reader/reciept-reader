// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.8.0'


console.log("Hi Receipt!")

serve(async (req) => {
  const data = await req.json();

  const supabase = await createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  //Adds the receipt and awaits the auto incremented receipt_id returned at the end of the query
  const { data: receiptData, error: receiptError } = await supabase
  .from('receipt')
  .insert({
      user_id: data.user_id,
      store_name: data.store_name,
      total: Number.parseFloat(data.total).toFixed(2),
      date: (data.date || new Date().toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',})),
      url: data.url,
    })
  .select('*'); 

  //receipt error check 
  if (receiptError) {
    console.log('Error inserting receipt:', receiptError.message);
    return new Response(JSON.stringify({message: receiptError.message}));
  }

  //setting id for item insertions
  const receiptId = receiptData[0].receipt_id;

  const itemData = data.items.map((item) => ({
    user_id: data.user_id,
    receipt_id: receiptId,
    item_name: item.item_name,
    custom_name: item.custom_name || undefined,
    price: Number.parseFloat(item.price).toFixed(2),
  }));

  //bulk insert with receipt id as a constant 
  const { itemError } = await supabase.from('item').insert(itemData);

  if (itemError) {
    console.log('Error inserting items:', itemError.message);
    return new Response(JSON.stringify({message: itemError.message}));

  } else {
    console.log('Receipt and items inserted successfully!');
    return new Response(JSON.stringify({message: 'Receipt and items inserted successfully!'}));
  }

  return new Response(JSON.stringify({message: "Why are you here"}));
  
})


