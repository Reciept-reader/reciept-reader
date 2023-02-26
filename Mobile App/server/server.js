const express = require("express");
const { generateUploadURL } = require("./s3");

const app = express();

app.use(express.static("front"));

app.get("/s3Url", async (req, res) => {
  try {
    const url = await generateUploadURL();
    res.send(200, { url });
  } catch (e) {
    console.log(e);
  }
});

app.listen(8080, () => console.log("listening on port 8080"));            
