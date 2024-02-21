const csvParser = require('csv-parser');
const fs = require('fs');
// Define a route to handle file upload
 const Uploads= (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const results = [];

  fs.createReadStream(file.path)
    .pipe(csvParser())
    .on('data', (data) => {
      // Process each row of CSV and push to results array
      results.push(data);
    })
    .on('end', () => {
      // Display the parsed CSV data in the console
      console.log(results);
      
      // Delete the uploaded CSV file after processing
      fs.unlinkSync(file.path);

      res.status(200).send('File uploaded and parsed successfully.');
    });
};
module.exports={Uploads};