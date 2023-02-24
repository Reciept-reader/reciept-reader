// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2'
//import { createWorker } from 'https://cdn.skypack.dev/tesseract-deno';
import { createWorker } from "https://cdn.skypack.dev/tesseract.js";
//import { createWorker } from "https://cdn.skypack.dev/pin/tesseract.js@v4.0.2-PFKPJGlQmOWLGEkvgSap/mode=imports/optimized/tesseractjs.js";




console.log("Hi OCR!")

serve(async (req) => {
    // Load image from a URL
    const image_url = 'https://imgs.search.brave.com/euj7cVxHGwXA3W73SAYSN2P3T6H79HijX4S_YABEIG8/rs:fit:559:1010:1/g:ce/aHR0cHM6Ly93d3cu/aGVyaXRhZ2VjaHJp/c3RpYW5jb2xsZWdl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxOS8wNS9mcmVl/LXdhbG1hcnQtcmVj/ZWlwdC10ZW1wbGF0/ZS1vZi00LTUtd2Fs/bWFydC1yZWNlaXB0/LXRlbXBsYXRlLW9m/LWZyZWUtd2FsbWFy/dC1yZWNlaXB0LXRl/bXBsYXRlLmpwZw';
    //const image_response = await fetch(image_url);
    //const image_buffer = await image_response.buffer();
  
    // Initialize Tesseract worker and recognize text
    const worker = createWorker();
    const { data: { text } } = await worker.recognize(image_url);
    await worker.terminate();
  
    console.log(text);
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Text recognized successfully',
        text,
      }),
    };
  });
  

