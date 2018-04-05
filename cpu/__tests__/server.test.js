import test from 'ava';
import listen from 'test-listen';
import request from 'got';

import server from '../server';

test('status code should be 200', async t => {
  const url = await listen(server);
  const response = await request(url);

  t.is(response.statusCode, 200);
});
