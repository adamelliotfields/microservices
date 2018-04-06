import test from 'ava';
import listen from 'test-listen';
import request from 'got';
import kindOf from 'kind-of';

import server from '../server';

test.before(async t => {
  const url = await listen(server);

  t.context.response = await request(url, { method: 'GET', json: true });
});

test('status code should be 200', t => {
  const { statusCode } = t.context.response;

  t.is(statusCode, 200);
});

test('content type should be application/json', t => {
  const { headers } = t.context.response;

  t.is(headers['content-type'], 'application/json; charset=utf-8');
});

test('model should be a string', t => {
  const { model } = t.context.response.body;
  const kind = kindOf(model);

  t.truthy(model);
  t.is('string', kind);
});

test('cores should be a number', t => {
  const { cores } = t.context.response.body;
  const kind = kindOf(cores);

  t.truthy(cores);
  t.is('number', kind);
});

test('used should be a number', t => {
  const { used } = t.context.response.body;
  const kind = kindOf(used);

  t.truthy(used);
  t.is('number', kind);
});

test('free should be a number', t => {
  const { free } = t.context.response.body;
  const kind = kindOf(free);

  t.truthy(free);
  t.is('number', kind);
});

test('meta should be an object', t => {
  const { meta } = t.context.response.body;
  const kind = kindOf(meta);

  t.truthy(meta);
  t.is('object', kind);
});

test('hostname should be a string', t => {
  const { hostname } = t.context.response.body.meta;
  const kind = kindOf(hostname);

  t.truthy(hostname);
  t.is('string', kind);
});

test('address should be a string', t => {
  const { address } = t.context.response.body.meta;
  const kind = kindOf(address);

  t.truthy(address);
  t.is('string', kind);
});

test('status code should be 404 if request URL is not /', async t => {
  const url = await listen(server);
  const { statusCode } = await request(`${url}/foo`, { method: 'GET', throwHttpErrors: false });

  t.is(statusCode, 404);
});
