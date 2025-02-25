import { CIADetails, availabilityOptions, integrityOptions, confidentialityOptions } from './useCIAOptions';

describe('useCIAOptions', () => {
  test('CIADetails type should be defined and exported', () => {
    const testDetail: CIADetails = {
      capex: 10,
      opex: 20,
      impact: 'Test impact',
      technical: 'Test technical',
      description: 'Test description',
    };
    expect(testDetail).toBeDefined();
  });

  test('availabilityOptions should be defined and have correct structure', () => {
    expect(availabilityOptions).toBeDefined();
    expect(availabilityOptions.None).toHaveProperty('capex');
    expect(availabilityOptions.None).toHaveProperty('opex');
    expect(availabilityOptions.None).toHaveProperty('impact');
    expect(availabilityOptions.None).toHaveProperty('technical');
    expect(availabilityOptions.None).toHaveProperty('description');
  });

  test('integrityOptions should be defined and have correct structure', () => {
    expect(integrityOptions).toBeDefined();
    expect(integrityOptions.None).toHaveProperty('capex');
    expect(integrityOptions.None).toHaveProperty('opex');
    expect(integrityOptions.None).toHaveProperty('impact');
    expect(integrityOptions.None).toHaveProperty('technical');
    expect(integrityOptions.None).toHaveProperty('description');
  });

  test('confidentialityOptions should be defined and have correct structure', () => {
    expect(confidentialityOptions).toBeDefined();
    expect(confidentialityOptions.None).toHaveProperty('capex');
    expect(confidentialityOptions.None).toHaveProperty('opex');
    expect(confidentialityOptions.None).toHaveProperty('impact');
    expect(confidentialityOptions.None).toHaveProperty('technical');
    expect(confidentialityOptions.None).toHaveProperty('description');
  });
});
