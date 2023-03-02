import { createWorker } from 'tesseract.js';

async function analyze_receipt(input) {

    try{
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      /**
       * Creation of Line data under the variable "lines" 
       * Line data consists of a collection of words, and
       * corresponding confidence. Currently this function
       * creates a 2D array "arr" that contains line data,
       * and the corresponding confidence for the entire 
       * line. 
      **/
      const { data: { lines } } = await worker.recognize(input);
      
      let arr = new Array(lines.length);
      
      for (let i = 0; i < lines.length; i++) {
        //arr[i] = [lines[i].text, lines[i].confidence];
        arr[i] = lines[i].text
      }
      await worker.terminate();
      return arr;
    }catch(error){
      console.log("error occured")
    }
  };

  export default analyze_receipt;