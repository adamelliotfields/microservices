import test from 'ava';
import kindOf from 'kind-of';

import { getCpuUsage, getProduction } from '../utils';

test('getCpuUsage returns a Promise', t => {
  const kind = kindOf(getCpuUsage());

  t.is('promise', kind);
});

test('getCpuUsage\'s Promise resolves an object', async t => {
  const usage = await getCpuUsage();
  const kind = kindOf(usage);

  t.is('object', kind);
});

test('getProduction returns a boolean', t => {
  const production = getProduction();
  const kind = kindOf(production);

  t.is('boolean', kind);
});
