const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  let data;
  
  // Open input file, return -1 if it does not exist
  try {
      data = fs.readFileSync(indata, 'utf8').split('\n');
  } catch (error) {
      console.error('Error reading the file:', error.message);
      return -1; // Return -1 if the file does not exist or cannot be read
  }
  
  // delete output file if it already exists
  if (fs.existsSync(outdata)) {
    fs.unlinkSync(outdata);
  }
  // Open the output file in write mode
  const outfile = fs.openSync(outdata, 'w');

  data.slice(1).forEach(line => {
    const lineArr = line.split(delimiter)
    const review = lineArr[0].trim();
    const sentiment = lineArr[1].trim();    
    console.log('review: ', review.substring(0,20));
    console.log('sentiment: ', sentiment);
    const outputLine = sentiment + delimiter + review.substring(0,20) + '\n';
    fs.writeSync(outfile, outputLine);       
  });
  fs.closeSync(outfile);
  console.log(data.length - 1); 
  return data.length - 1;
}

let test_input = './testing/testdata_5.csv'
parseFile(test_input, './outputfile.csv');

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}