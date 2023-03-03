import { createSupaClient } from "./databaseFun.js";
import { decode } from "base64-arraybuffer";
import { v4 as uuid } from "uuid";
import secureRandom from "secure-random";
import { usernameAndCount } from "./userDataFun.js";
// get the file data from the image picker library

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};



export async function uploadReceipt(response, userid) {
  try {
    const user = await usernameAndCount(userid);
    const hostUrl =
      "https://ixxtmhjztlfsfjorurfi.supabase.co/storage/v1/object/public/receipts/";
    const fileName = `${userid}img${user.receipt_count}`; //storageName
    //ABOVE IS HARD CODED BECAUSE OF WEIRD UNDEFINED ERROR

    
    const id = uuid({ random: secureRandom });
    const extension = response.uri.split(".").pop();
    const data = await fetch(response.uri);
    if (!data.ok) {
      return -1;
    }
    const supabase = await createSupaClient();
    const { data: responseData, error } = await supabase.storage
      .from("receipts")
      .upload(`${fileName}.${extension}`, decode(response.base64), {
        contentType: `image/${extension}`,
      });

    return `${hostUrl}${fileName}.${extension}`;
  } catch (error) {
    return -1
    //return -1
    return `${hostUrl}${fileName}.${extension}`;
  }
}

export default { uploadReceipt };
