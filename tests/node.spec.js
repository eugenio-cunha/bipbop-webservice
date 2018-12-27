const {
  WebService, Push, pushParameters, get,
} = require('../bundle.js');

const { apiKey } = process.env;

describe('#halo', () => {
  const ws = new WebService(apiKey);
  it('#works', () => ws.request("SELECT FROM 'INFO'.'INFO'", {
    SimpleTest: 'ThisIsASimpleTest',
  }).then(response => response.text())
    .then(content => WebService.parse(content))
    .then(({ BPQL }) => {
      if (BPQL.header.query !== 'SELECT FROM \'INFO\'.\'INFO\'') {
        throw new Error('Ocorreu uma falha! A consulta não confere!');
      }
    }));

  const push = new Push(ws);
  it('#push', () => push.insertJob({
    [pushParameters.query]: 'SELECT FROM \'INFO\'.\'INFO\'',
  }).then(response => response.text())
    .then(text => WebService.parse(text))
    .then(text => get(text, 'BPQL.header.exception'))
    .then(text => console.log(text)));
});
