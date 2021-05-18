import select from 'select';
import command from '../../src/common/command';

describe('#command', () => {
  before(() => {
    global.stub = sinon.stub(document, 'execCommand');
    global.input = document.createElement('input');
    global.input.setAttribute('id', 'input');
    global.input.setAttribute('value', 'abc');
    document.body.appendChild(global.input);
  });

  after(() => {
    global.stub.restore();
    document.body.innerHTML = '';
  });

  it('should execute cut', (done) => {
    global.stub.returns(true);
    select(document.querySelector('#input'));

    assert.isTrue(command('cut'));
    done();
  });

  it('should execute copy', (done) => {
    global.stub.returns(true);
    select(document.querySelector('#input'));

    assert.isTrue(command('copy'));
    done();
  });

  it('should not execute copy', (done) => {
    global.stub.returns(false);
    select(document.querySelector('#input'));

    assert.isFalse(command('copy'));
    done();
  });

  it('should not execute cut', (done) => {
    global.stub.returns(false);
    select(document.querySelector('#input'));

    assert.isFalse(command('cut'));
    done();
  });
});
