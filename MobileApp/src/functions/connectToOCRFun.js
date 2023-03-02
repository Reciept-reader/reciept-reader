import fetch from 'node-fetch';

//What is assumed to always be where the OCR container is hosted
const linkToAWSEC2Server = 'http://ec2-35-89-83-59.us-west-2.compute.amazonaws.com:3000/';

//host URL can be changed by passing a new parameter if desired
//image URL is the path to a publically host image for the OCR to analyze
export async function getDataFromOCR(imageUrl, hostUrl = linkToAWSEC2Server) { 

    //Connect to host
    const response = await fetch(hostUrl, {
            method: 'POST',
            body: JSON.stringify( { "url": imageUrl } ),
            headers: { 'Content-Type': 'application/json' }
    });
    //Receive data
    const data = await response.json();

    return data;
}

export default { getDataFromOCR }