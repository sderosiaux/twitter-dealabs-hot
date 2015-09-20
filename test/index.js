import { expect } from 'chai';
import bot from '../index.js';

describe('the bot', () => {
  it('should connect', () => {
    const b = bot();
    expect(b.connected).to.be.true;
  });
});
