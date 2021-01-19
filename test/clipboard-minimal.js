import clipboard from '../src/clipboard-minimal';

describe('Clipboard minimal api', () => {
  it('should have copy', () => {
    assert.ok(clipboard.copy !== undefined);
  });
});
