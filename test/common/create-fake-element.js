import createFakeElement from '../../src/common/create-fake-element';

describe('createFakeElement', () => {
  it('should define a fake element and set the position right style property', (done) => {
    // Set document direction
    document.documentElement.setAttribute('dir', 'rtl');

    const el = createFakeElement(document.body);

    assert.equal(el.style.right, '-9999px');
    done();
  });
});
