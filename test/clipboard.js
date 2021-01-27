import clipboard from '../src/clipboard';

describe('Clipboard minimal api', () => {
  it('should have copy', () => {
    assert.ok(clipboard.copy !== undefined);
  });
});
