import {
  isDifferentCompany,
  isSimilarCompany,
  getSimilarCompanies,
  filterCandidates,
  percentile,
  getPercentiles,
  getRankings
} from './rankingUtils';

describe('ranking utility functions', () => {
  const companies = {
    1: { fractalIndex: '0.678' },
    2: { fractalIndex: '0.782' },
    3: { fractalIndex: '0.795' },
    4: { fractalIndex: '0.724' },
    5: { fractalIndex: '0.523' },
  };

  const originalCompany = companies[2];
  const fIndex1 = originalCompany.fractalIndex;

  test('isDifferentCompany checks for equality of two company IDs', () => {
    expect(isDifferentCompany('1', '2')).toBeTruthy();
    expect(isDifferentCompany('3', '3')).toBeFalsy();
  });

  test('isSimilarCompany checks for a low difference in fractal indices', () => {
    const similarCompany = companies[1];
    const similarIndex = similarCompany.fractalIndex;
    const dissimilarCompany = companies[5];
    const dissimilarIndex = dissimilarCompany.fractalIndex;

    expect(isSimilarCompany(fIndex1, similarIndex)).toBeTruthy();
    expect(isSimilarCompany(fIndex1, dissimilarIndex)).toBeFalsy();
    expect(isSimilarCompany(similarIndex, dissimilarIndex)).toBeFalsy();
  });

  test('getSimilarCompanies returns an object with similar companies as keys', () => {
    const similarCompanies = getSimilarCompanies(2, companies);
    expect(similarCompanies).toHaveProperty('1');
    expect(similarCompanies).not.toHaveProperty('5');
  });

  test('getSimilarCompanies does not include the original company', () => {
    const similarCompanies = getSimilarCompanies(2, companies);
    expect(similarCompanies).not.toHaveProperty('2');
  });

  test('filterCandidates finds other candidates from similar companies', () => {

  });

  test('filterCandidates finds other candidates with the same title', () => {

  });

  test('percentile calculates the percentile ranking of a score', () => {

  });

  test('getPercentiles returns an array of percentiles by category', () => {

  });

  test('getRankings returns the percentile rankings for a single candidate', () => {

  });
});
