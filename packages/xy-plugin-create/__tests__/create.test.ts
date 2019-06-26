import { Create } from '../src/index';

describe('Create', () => {
  test('test with error ui value', () => {
    expect(() => {
      new Create('test', {
        ui: 'test',
        mode: 'test',
      });
    }).toThrow('ui is not valid');
  });

  test('test with error mode value', () => {
    expect(() => {
      new Create('test', {
        ui: 'e',
        mode: 'test',
      });
    }).toThrow('mode is not valid');
  });
});
