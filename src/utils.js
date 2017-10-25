// utility functions for fetching and processing CSV data

// assumes 1st column in csv is an ID + has arbitrary other columns
// assumes 1st row of data is column names
// also assumes that there is at least 1 row of data other than column names
function processCSV(csvText, columnsArr) {
  const processedData = {};
  const splitByLine = csvText.split('\n');

  for (let i = 1; i < splitByLine.length; i++) {
    const currentLine = splitByLine[i].split(',');
    const id = currentLine[0];

    processedData[id] = {};
    for (let j = 0; j < columnsArr.length; j++) {
      const column = columnsArr[j];
      const columnData = currentLine[j + 1];
      processedData[id][column] = columnData;
    }
  }

  return processedData;
}

export function getCandidatesData() {
  // used a CORS proxy so i can fetch the data from localhost...
  return fetch('https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/simple-fractal-recruiting/score-records.csv')
    .then(data => data.text())
    .then((scores) => {
      const columns = ['communicationScore', 'codingScore', 'title', 'companyId'];
      const processedScores = processCSV(scores, columns);
      return processedScores;
    })
    .catch(() => console.log('Failed to fetch candidate data!'));
}

export function getCompaniesData() {
  return fetch('https://cors-anywhere.herokuapp.com/https://s3.amazonaws.com/simple-fractal-recruiting/companies.csv')
    .then(data => data.text())
    .then((companies) => {
      const columns = ['fractalScore'];
      const processedCompanies = processCSV(companies, columns);
      return processedCompanies;
    })
    .catch(() => console.log('Failed to fetch company data!'));
}
