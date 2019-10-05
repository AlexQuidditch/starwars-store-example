
import qs from 'qs';

import { Starship } from '@/@types';

import { starships } from '@/providers';

interface Params {
  [key: string]: string | null
}

async function loadAll () {
  let params: Params = {};
  const result: Array<Starship> = [];

  async function loader (query: Params) {
    const { next, results } = await starships.load(query);

    params = next
      ? qs.parse(next.split('?')[1])
      : null;

    result.push(...results);

    if (params && params.page) await loader(params);
    else { return false; }
  }

  await loader(params);

  return result;
}

export default {
  loadAll,
};
