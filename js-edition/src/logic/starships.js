
import qs from 'qs';

import { starships } from '@/providers';

async function loadAll () {
  let params = {};
  const result = [];

  async function loader (query) {
    const { next, results } = await starships.load(query);

    params = next
      ? qs.parse(next.split('?')[1])
      : null;

    result.push(...results);

    if (params && params.page) await loader(params);
    else return false;
  }

  await loader(params);

  return result;
}

export default {
  loadAll,
};
