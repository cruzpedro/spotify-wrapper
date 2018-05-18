import { expect } from 'chai';

describe('Main', () => {
  let arr = [];

  beforeEach(() => {
    arr = [1, 2, 3];
  });

  it('should be an array', () => {
    expect(arr).to.be.an('array');
  });

  it('should have size of 4 when push another value to the array', () => {
    arr.push(4);
    expect(arr).to.have.lengthOf(4);
  });

  it('should have size of 2 when pop a value of the array', () => {
    arr.pop();
    expect(arr).to.have.lengthOf(2);
  });

  it('should remove the value 3 when use pop in the array', () => {
    arr.pop();
    expect(arr).to.not.include(3);
  });

  it('should return true when pop 3 from the array', () => {
    expect(arr.pop()).to.be.equal(3);
  });
});
