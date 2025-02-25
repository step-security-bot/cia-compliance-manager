// Mock for Chart.js
export default class Chart {
  static defaults = { color: "#666" };
  static register = jest.fn();

  constructor() {
    return {
      destroy: jest.fn(),
      update: jest.fn(),
    };
  }

  destroy = jest.fn();
}
