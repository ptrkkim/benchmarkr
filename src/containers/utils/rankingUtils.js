// final getRankings function + associated helpers

export const isSimilarCompany = (fIndex1, fIndex2) =>
  Math.abs(+fIndex1 - +fIndex2) < 0.15;

// INCLUDES engineers from same company
export const getSimilarCompanies = (companyId, companiesData) => {
  const fIndex1 = companiesData[companyId].fractalIndex;
  const similarCompanies = Object.keys(companiesData)
    .reduce((similar, otherId) => {
      const fIndex2 = companiesData[otherId].fractalIndex;
      return isSimilarCompany(fIndex1, fIndex2)
        ? { ...similar, [otherId]: otherId }
        : similar;
    }, {});

  return similarCompanies;
};

export const filterCandidates = (candidateTitle, candidatesData, similarCompanies) => {
  const similarCandidates = [];
  Object.keys(candidatesData).forEach((key) => {
    const candidate = candidatesData[key];
    const { title, companyId } = candidate;

    // includes the candidate in question... i believe they should be included in percentile calc
    if (title === candidateTitle && similarCompanies[+companyId]) {
      similarCandidates.push(candidate);
    }
  });

  return similarCandidates;
};

// percentile rank formula from https://en.wikipedia.org/wiki/Percentile_rank
export const percentile = (lowerScoreCount, equalScoreCount, populationSize) =>
  (lowerScoreCount + (0.5 * equalScoreCount)) / populationSize;

export const getPercentiles = (candidate, similarCandidates) => {
  const { communicationScore, codingScore } = candidate;
  const numCandidates = similarCandidates.length;
  let lowerCommCount = 0;
  let lowerCodingCount = 0;
  let equalCommCount = 1; // self
  let equalCodingCount = 1; // self

  for (let i = 0; i < similarCandidates.length; i++) {
    const otherCandidate = similarCandidates[i];
    if (+otherCandidate.communicationScore < +communicationScore) {
      lowerCommCount += 1;
    } else if (+otherCandidate.communicationScore === +communicationScore) {
      equalCommCount += 1;
    }

    if (+otherCandidate.codingScore < +codingScore) {
      lowerCodingCount += 1;
    } else if (+otherCandidate.codingScore === +codingScore) {
      equalCodingCount += 1;
    }
  }

  console.log('lowerComm', lowerCommCount);
  console.log('equalComm', equalCommCount);
  console.log('numCandidates', numCandidates);
  const commPercentile = percentile(lowerCommCount, equalCommCount, numCandidates);
  const codePercentile = percentile(lowerCodingCount, equalCodingCount, numCandidates);

  return [commPercentile, codePercentile];
};

const getRankings = (candidateId, candidatesData, companiesData) => {
  const candidate = candidatesData[candidateId];
  const { title, companyId } = candidate;

  const similarCompanies = getSimilarCompanies(+companyId, companiesData);
  const similarCandidates = filterCandidates(title, candidatesData, similarCompanies);

  return getPercentiles(candidate, similarCandidates); // returns [commPercentile, codePercentile]
};

export default getRankings;
