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

  test('getSimilarCompanies includes the original company', () => {
    const similarCompanies = getSimilarCompanies(2, companies);
    expect(similarCompanies).toHaveProperty('2');
  });

  test.skip('filterCandidates finds other candidates from similar companies', () => {

  });

  test.skip('filterCandidates finds other candidates with the same title', () => {

  });

  test.skip('percentile calculates the percentile ranking of a score', () => {

  });

  test.skip('getPercentiles returns an array of percentiles by category', () => {

  });

  test.skip('getRankings returns the percentile rankings for a single candidate', () => {

  });
});
