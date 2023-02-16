import { createWorker } from 'tesseract.js';

const worker = await createWorker();
async function analyze_receipt(input) {
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
      arr[i] = [lines[i].text, lines[i].confidence];
    }
    await worker.terminate();
    return arr;
  };

  export default analyze_receipt;