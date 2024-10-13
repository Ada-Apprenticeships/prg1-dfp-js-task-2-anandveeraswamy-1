const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  let data;

  // Open the output file in write mode
  const outfile = fs.openSync(outdata, 'w');
    
  try {
      data = fs.readFileSync(indata, 'utf8').split('\n');
  } catch (error) {
      console.error('Error reading the file:', error.message);
      return -1; // Return -1 if the file does not exist or cannot be read
  }

  data.slice(1).forEach(line => {
    const lineArr = line.split(';')
    const review = lineArr[0].trim();
    const sentiment = lineArr[1].trim();    
    console.log('review: ', review.substring(0,20));
    console.log('sentiment: ', sentiment);
  });

  

}



let test_input = './testing/testdata_5.csv'
parseFile(test_input, './outputfile.csv');

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}