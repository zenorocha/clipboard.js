import select from 'select';
import command from '../../src/common/command';

describe('command', () => {
  before(() => {
    global.input = document.createElement('input');
    global.input.setAttribute('id', 'input');
    global.input.setAttribute('value', 'abc');
    document.body.appendChild(global.input);
  });

  after(() => {
    document.body.innerHTML = '';
  });

  it('should execute cut command', (done) => {
    // Set document direction
    document.documentElement.setAttribute('dir', 'rtl');

    select(document.querySelector('#input'));

    assert.isTrue(command('cut'));
    done();
  });

  it('should execute copy command', (done) => {
    // Set document direction
    document.documentElement.setAttribute('dir', 'rtl');

    select(document.querySelector('#input'));

    assert.isTrue(command('copy'));
    done();
  });
});
